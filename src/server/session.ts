import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
//import { NextRequest, NextResponse } from "next/server";
//import { NextRequest } from "next/server";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

// export async function updateSession(req: NextRequest) {
//   const session = (await cookies()).get("session")?.value;

//   if (!session) return;
//   const parsed = await decrypt(session);
//   parsed.expiresAt = new Date(Date.now() + 10 * 1000);

//   const res = NextResponse.next()
//   res.cookies.set({
//     name: 'session',
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires:
//   })
//   // const updatedSession = await encrypt({ userId: parsed?.userId, expiresAt });
//   // console.log(updatedSession);
//   // (await cookies()).set("session", updatedSession, {
//   //   httpOnly: true,
//   //   secure: true,
//   //   expires: expiresAt,
//   // });
// }

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    // const { userId, expiresAt } = payload;
    // return { userId, expiresAt };
    return payload;
  } catch (error) {
    console.log(error, "failed to verify session");
  }
}
