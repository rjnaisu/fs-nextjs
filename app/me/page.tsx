import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "../services/session";
import { generateApiToken } from "../actions/users";

const MePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">My Profile</h2>
      <p>Name: {user.name}</p>
      <p className="text-muted-foreground">Username: {user.username}</p>
      <h2>API Token:</h2>
      <p className="text-muted-foreground">{user.token ?? "You don't have any!"}</p>
      <form action={generateApiToken}>
        <Button type="submit">Generate New Token</Button>
      </form>
    </div>
  );
};

export default MePage;
