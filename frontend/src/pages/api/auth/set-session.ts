import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";

export const POST: APIRoute = async ({ request, cookies }) => {
  const { idToken } = await request.json();
  const auth = getAuth(app);

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    // Set cookie with the session cookie
    cookies.set("__session", sessionCookie, {
      path: "/",
      httpOnly: true,
      maxAge: expiresIn / 1000,
    });

    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating session cookie:", error as Error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
