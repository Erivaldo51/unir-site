"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/admin/session";

export type LoginState = { error?: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "ADMIN_PASSWORD não configurado no servidor." };
  }
  if (typeof password !== "string" || password !== expected) {
    return { error: "Senha incorreta." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
