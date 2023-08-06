import type { Handle } from "@sveltejs/kit";
import { db } from "$lib/database";

export const handle: Handle = async ({ event, resolve }) => {
  // If the country isn't received from the header, Set a default country (Get the country from vercel env)
  const defaultCountry = process.env.DEFAULT_COUNTRY || "";
  const country =
    event.request.headers.get("x-vercel-ip-country") || defaultCountry;

  event.locals.country = country;

  // get cookies from browser
  const session = event.cookies.get("session");

  if (!session) {
    return await resolve(event);
  }

  const user = await db.user.findUnique({
    where: { userAuthToken: session },
    select: { username: true, role: true },
  });

  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.role,
    };
  }

  return await resolve(event);
};
