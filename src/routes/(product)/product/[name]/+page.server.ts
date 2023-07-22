import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals }) => {
  console.log("Product name: ", params.name);
  // Get the country here

  console.log("Country in the product server: ", locals.country);

  // Get the product url for the country using name and country code from the db

  // Redirect to that product url
  throw redirect(302, "/");
}) satisfies PageServerLoad;
