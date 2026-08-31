import Link from "next/link";
import { connection } from "next/server";
import { getUsers } from "../services/users";

const Users = async () => {
  await connection();

  const users = await getUsers();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">Users</h2>
      <ul className="divide-y divide-foreground/10 rounded-md border border-foreground/10">
        {users.map((user) => (
          <li key={user.id} className="px-4 py-3 text-sm">
            <Link
              href={`/users/${user.username}`}
              className="text-lg font-semibold underline-offset-4 hover:underline"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
