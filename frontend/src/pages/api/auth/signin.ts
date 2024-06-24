import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  console.log("Received ID Token:", idToken); // Add this log to debug

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  /* Verify id token */
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    console.log("Decoded Token:", decodedToken); // Add this log to debug

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    /* Set session cookie */
    cookies.set("__session", sessionCookie, { path: "/", httpOnly: true });

    return redirect("/dashboard");
  } catch (error) {
    console.error("Error verifying token:", error); // Add this log to debug
    return new Response("Invalid token", { status: 401 });
  }
};
