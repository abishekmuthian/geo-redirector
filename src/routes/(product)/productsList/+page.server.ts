import type { PageServerLoad } from "./$types";
import { db } from "$lib/database";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    console.log(
      "username in add products list table page server: ",
      locals.user
    );
  }
  const products = await db.product.findMany({
    where: {
      owner: locals.user.name,
    },
    select: {
      name: true,
      links: {
        select: {
          country: true,
          url: true,
        },
      },
    },
  });
  // console.log(products);
  return {
    page_server_data: { productRows: products },
  };
};
