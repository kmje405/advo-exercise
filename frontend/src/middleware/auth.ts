import { app } from "../firebase/server";
import { getAuth } from "firebase-admin/auth";
import type { MiddlewareHandler } from "astro";

export const requireAuth: MiddlewareHandler = async ({ cookies, redirect }): Promise<void | Response> => {
  const sessionCookie = cookies.get("__session")?.value;

  if (!sessionCookie) {
    console.log("No session cookie found, redirecting to /signin");
    return redirect("/signin");
  }

  try {
    await getAuth(app).verifySessionCookie(sessionCookie, true);
    console.log("Session cookie verified");
    return;
  } catch (error) {
    console.error("Error verifying session cookie:", error); // Enhanced error log
    return redirect("/signin");
  }
};
