CREATE TABLE "blacklisted_emails" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blacklisted_emails_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"blacklisted_by" text NOT NULL,
	CONSTRAINT "blacklisted_emails_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "whitelisted_domains" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "whitelisted_domains_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"domain" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"whitelisted_by" text NOT NULL,
	CONSTRAINT "whitelisted_domains_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE "whitelisted_emails" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "whitelisted_emails_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"whitelisted_by" text NOT NULL,
	CONSTRAINT "whitelisted_emails_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "blacklisted_emails" ADD CONSTRAINT "blacklisted_emails_blacklisted_by_users_sync_id_fk" FOREIGN KEY ("blacklisted_by") REFERENCES "neon_auth"."users_sync"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whitelisted_domains" ADD CONSTRAINT "whitelisted_domains_whitelisted_by_users_sync_id_fk" FOREIGN KEY ("whitelisted_by") REFERENCES "neon_auth"."users_sync"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whitelisted_emails" ADD CONSTRAINT "whitelisted_emails_whitelisted_by_users_sync_id_fk" FOREIGN KEY ("whitelisted_by") REFERENCES "neon_auth"."users_sync"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "domain_unique" ON "whitelisted_domains" USING btree ("domain");