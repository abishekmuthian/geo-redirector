import type { Handle } from "@sveltejs/kit";
import { db } from "$lib/database";

export const handle: Handle = async ({ event, resolve }) => {
  // Get the ip from the headers
  console.log("headers: ", event.request.headers);

  console.log(
    "Country in hooks: ",
    event.request.headers.get("x-vercel-ip-country")
  );

  // If the country isn't received from the header, Set a default country (Get the country from vercel env)

  const defaultCountry = process.env.DEFAULT_COUNTRY || "";
  const country =
    event.request.headers.get("x-vercel-ip-country") || defaultCountry;

  event.locals.country = country;

  // get cookies from browser
  const session = event.cookies.get("session");

  console.log("session:", session);

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event);
  }

  // find the user based on the session
  const user = await db.user.findUnique({
    where: { userAuthToken: session },
    select: { username: true, role: true },
  });

  console.log("user:", user);

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.role,
    };
  }

  // load page as normal
  return await resolve(event);
};
