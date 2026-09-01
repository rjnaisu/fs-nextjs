import { Label } from "@/components/ui/label";
import { registerUser } from "../actions/users";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">Register</h2>
      <form action={registerUser} className="space-y-4">
        <div>
          <Label className="grid gap-2">
            Username
            <Input type="text" name="username" required />
          </Label>
        </div>
        <div>
          <Label className="grid gap-2">
            Name
            <Input type="text" name="name" required />
          </Label>
        </div>
        <div>
          <Label className="grid gap-2">
            Password
            <Input type="password" name="password" required />
          </Label>
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
