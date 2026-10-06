"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "@/components/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { status } = useSession();
  const { showNotification } = useNotification();
  // Session initialization and sign-in both set auth cookies. Let initialization
  // finish first so its response cannot overwrite the sign-in CSRF cookie.
  const isDisabled = status === "loading" || isSubmitting;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    const formData = new FormData(e.currentTarget);
    setError("");
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid username or password"
            : "Unable to sign in. Please try again.",
        );
      } else if (result?.ok) {
        showNotification("Logged in successfully");
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            <Input type="text" name="username" disabled={isDisabled} required />
          </Label>
        </div>
        <div>
          <Label className="grid gap-2">
            Password
            <Input type="password" name="password" disabled={isDisabled} required />
          </Label>
        </div>
        <Button data-testid="login-button" type="submit" disabled={isDisabled}>
          Login
        </Button>
      </form>
    </div>
  );
}
