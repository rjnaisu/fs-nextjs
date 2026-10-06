"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "@/components/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      showNotification("Logged in successfully");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">Login</h2>
      {error && (
        <p
          data-testid="error-message"
          role="alert"
          className="text-sm font-medium text-destructive"
        >
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="grid gap-2">
            Username
            <Input type="text" name="username" required />
          </Label>
        </div>
        <div>
          <Label className="grid gap-2">
            Password
            <Input type="password" name="password" required />
          </Label>
        </div>
        <Button data-testid="login-button" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
