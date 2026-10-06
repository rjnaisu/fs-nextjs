"use client";

import { Label } from "@/components/ui/label";
import { registerUser } from "../actions/users";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { initialRegisterUserState } from "./state";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialRegisterUserState);
  const [username, setUsername] = useState(state.values.username);
  const [name, setName] = useState(state.values.name);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">Register</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <Label className="grid gap-2">
            Username
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </Label>
          {state.errors.username && (
            <p data-testid="username-error" className="mt-2 text-sm font-medium text-destructive">
              {state.errors.username}
            </p>
          )}
        </div>
        <div>
          <Label className="grid gap-2">
            Name
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Label>
          {state.errors.name && (
            <p className="mt-2 text-sm font-medium text-destructive">{state.errors.name}</p>
          )}
        </div>
        <div>
          <Label className="grid gap-2">
            Password
            <Input type="password" name="password" required />
          </Label>
          {state.errors.password && (
            <p className="mt-2 text-sm font-medium text-destructive">{state.errors.password}</p>
          )}
        </div>
        <div>
          <Label className="grid gap-2">
            Confirm Password
            <Input type="password" name="passwordConfirm" required />
          </Label>
          {state.errors.passwordConfirm && (
            <p
              data-testid="passwordConfirm-error"
              className="mt-2 text-sm font-medium text-destructive"
            >
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <Button data-testid="register-button" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
