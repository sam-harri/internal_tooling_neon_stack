import { desc } from 'drizzle-orm';
import db from '@/db';
import { stackServerApp } from '@/stack';
import {
  whitelistedDomainsTable,
  whitelistedEmailsTable,
  blacklistedEmailsTable,
} from '@/db/schema';
import { AccessListCard } from './AccessListCard';
import * as actions from '@/lib/access';

export default async function AccessListController() {
  const [rawDomains, rawWhitelistedEmails, rawBlacklistedEmails] = await Promise.all([
    db.select().from(whitelistedDomainsTable).orderBy(desc(whitelistedDomainsTable.createdAt)),
    db.select().from(whitelistedEmailsTable).orderBy(desc(whitelistedEmailsTable.createdAt)),
    db.select().from(blacklistedEmailsTable).orderBy(desc(blacklistedEmailsTable.createdAt)),
  ]);

  // avoid double fetching users if their user id is in multiple lists.
  const userIds = new Set<string>();
  rawDomains.forEach((d) => userIds.add(d.whitelistedBy));
  rawWhitelistedEmails.forEach((e) => userIds.add(e.whitelistedBy));
  rawBlacklistedEmails.forEach((e) => userIds.add(e.blacklistedBy));

  const userPromises = Array.from(userIds).map((id) =>
    stackServerApp.getUser(id).catch((error) => {
      console.error(`Failed to fetch user details for ID: ${id}`, error);
      return { id, displayName: 'Deleted User', primaryEmail: null };
    })
  );
  const userResults = await Promise.all(userPromises);

  // lookup map for user id -> details
  const userMap = new Map<string, { displayName: string | null; email: string | null }>();
  userResults.forEach((user) => {
    if (user) {
      userMap.set(user.id, { displayName: user.displayName, email: user.primaryEmail });
    }
  });

  const finalDomains = rawDomains.map((d) => {
    const addedBy = userMap.get(d.whitelistedBy) || { displayName: 'Unknown User', email: null };
    return {
      id: d.id,
      value: d.domain,
      addedByDisplayName: addedBy.displayName,
      addedByEmail: addedBy.email,
    };
  });

  const finalWhitelistedEmails = rawWhitelistedEmails.map((e) => {
    const addedBy = userMap.get(e.whitelistedBy) || { displayName: 'Unknown User', email: null };
    return {
      id: e.id,
      value: e.email,
      addedByDisplayName: addedBy.displayName,
      addedByEmail: addedBy.email,
    };
  });

  const finalBlacklistedEmails = rawBlacklistedEmails.map((e) => {
    const addedBy = userMap.get(e.blacklistedBy) || { displayName: 'Unknown User', email: null };
    return {
      id: e.id,
      value: e.email,
      addedByDisplayName: addedBy.displayName,
      addedByEmail: addedBy.email,
    };
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AccessListCard
        title="Whitelisted Domains"
        description="Allow sign-ups from any email at these domains. Enter only the domain (e.g., yourcompany.com)."
        inputPlaceholder="yourcompany.com"
        list={finalDomains}
        addAction={actions.addWhitelistedDomain}
        removeAction={actions.removeWhitelistedDomain}
      />
      <AccessListCard
        title="Whitelisted Emails"
        description="Allow specific external emails to sign up (e.g., contractors, partners)."
        inputPlaceholder="partner@example.com"
        list={finalWhitelistedEmails}
        addAction={actions.addWhitelistedEmail}
        removeAction={actions.removeWhitelistedEmail}
      />
      <AccessListCard
        title="Blacklisted Emails"
        description="Explicitly block specific emails, even if their domain is whitelisted."
        inputPlaceholder="spammer@yourcompany.com"
        list={finalBlacklistedEmails}
        addAction={actions.addBlacklistedEmail}
        removeAction={actions.removeBlacklistedEmail}
      />
    </div>
  );
}
