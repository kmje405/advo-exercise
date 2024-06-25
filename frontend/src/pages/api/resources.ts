import type { APIRoute } from "astro";
import { app } from "../../firebase/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

const db = getFirestore(app);

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get("__session")?.value;

  if (!sessionCookie) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const decodedClaims = await getAuth(app).verifySessionCookie(sessionCookie, true);

    const resourceData = await request.json();
    await db.collection("resources").add({
      ...resourceData,
      userId: decodedClaims.uid,
      createdAt: Timestamp.now(),
    });

    return new Response(null, { status: 201 });
  } catch (error: any) {
    console.error("Error adding resource:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
