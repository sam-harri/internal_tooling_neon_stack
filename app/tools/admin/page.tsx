import UserTableController from '@/components/admin/UserTable/UserTableController';
import AccessListController from '@/components/admin/accessLists/AccessListController';

export default async function UsersPage() {
  return (
    <div className="mx-auto mt-8 w-[90%] space-y-12">
      <div>
        <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-200">
          Access Management
        </h1>
        <AccessListController />
      </div>

      <div>
        <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-200">
          User Management
        </h1>
        <UserTableController />
      </div>
    </div>
  );
}
