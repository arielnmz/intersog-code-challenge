"use client";

import { useFormStatus, useFormState } from "react-dom";
import { signin } from "@/app/actions/auth";

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="bg-neutral-800 p-1"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export function SigninForm() {
  const [state, action] = useFormState(signin, undefined);

  return (
    <form action={action}>
      <div className="flex flex-row items-start justify-start space-x-2">
        <div>
          <label htmlFor="email">Email</label>:
          <input
            id="email"
            name="email"
            placeholder="Email"
            className="bg-neutral-700 text-white"
          />
        </div>

        <div className={"ml-2"}>
          <label htmlFor="password">Password</label>:
          <input
            id="password"
            name="password"
            type="password"
            className="bg-neutral-700 text-white"
          />
        </div>

        <SignupButton />
        {state?.errors && <div className="text-red-800">{state.errors}</div>}
        {state?.message && (
          <div className="text-green-800">{state.message}</div>
        )}
      </div>
    </form>
  );
}
