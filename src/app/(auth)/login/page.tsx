"use client";

import { AuthShell } from "@/components/layouts/auth/AuthShell";
import { useLogin } from "@/hooks/useLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export default function LoginPage() {
  const { mutate, isPending, error } = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(values: LoginInput) {
    mutate(values);
  }

  return (
      <AuthShell title="Welcome back" subtitle="Sign in to continue to your portal">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
                type="email"
                {...register("email")}
                className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="you@example.com"
            />
            {errors.email && (
                <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
                type="password"
                {...register("password")}
                className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
            />
            {errors.password && (
                <p className="mt-1 text-xs text-danger">{errors.password.message}</p>
            )}
          </div>

          {error && (
              <p className="text-sm text-danger">
                Invalid email or password. Please try again.
              </p>
          )}

          <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-60"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </AuthShell>
  );
}
