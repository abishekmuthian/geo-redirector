import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  console.log("Product name: ", params.name);
  // Find the country here

  // Get the product url for the country using name and country code from the db

  // Redirect to that product url
  throw redirect(302, "/");
}) satisfies PageServerLoad;
