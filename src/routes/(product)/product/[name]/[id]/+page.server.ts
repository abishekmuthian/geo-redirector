import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { db } from "$lib/database";

console.log("product/productname");
export const load = (async ({ params, locals }) => {
  console.log("Product name: ", params.name);
  console.log("Product id: ", params.id);
  let productId = parseInt(params.id);
  console.log(typeof productId, productId);
  // Get the country here

  console.log("Country in the product server: ", locals.country);

  // Get the product url for the country using name and country code from the db
  //added
  const getProduct = await db.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
    select: {
      name: true,
      links: {
        where: {
          country: locals.country,
        },
        select: {
          country: true,
          url: true,
        },
      },
    },
  });
  console.log("get product:::", getProduct);
  console.log("Required country URL", getProduct?.links[0]["url"]);

  const productURL = getProduct?.links[0]["url"] || "/";

  //added
  // Redirect to that product url
  throw redirect(302, productURL);
}) satisfies PageServerLoad;
