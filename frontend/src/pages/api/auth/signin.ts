import type { APIRoute } from "astro";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebase/client";

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();
  const auth = getAuth(app);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    return new Response(JSON.stringify({ idToken }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error('Error signing in:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
