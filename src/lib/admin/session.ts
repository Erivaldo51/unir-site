import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "unir_admin_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET não configurado.");
  }
  return new TextEncoder().encode(secret);
}

async function encrypt(payload: { admin: true }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_MS / 1000}s`)
    .sign(getSecretKey());
}

async function decrypt(session: string) {
  const { payload } = await jwtVerify(session, getSecretKey(), { algorithms: ["HS256"] });
  return payload as { admin: true };
}

export async function createSession() {
  const session = await encrypt({ admin: true });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/** Retorna true se houver uma sessão de admin válida. Não redireciona. */
export async function hasValidSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  try {
    const payload = await decrypt(cookie);
    return payload.admin === true;
  } catch {
    return false;
  }
}

/** Usar em Server Actions e páginas de admin: redireciona para o login se a sessão não for válida. */
export async function verifySession(): Promise<void> {
  const valid = await hasValidSession();
  if (!valid) {
    redirect("/admin/login");
  }
}

export { COOKIE_NAME };
