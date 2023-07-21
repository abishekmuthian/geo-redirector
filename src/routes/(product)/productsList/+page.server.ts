import type { PageServerLoad } from "./$types";
import { db } from "$lib/database";

export const load: PageServerLoad = async () => {
  const products = await db.product.findMany({
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
  console.log(products);
  return {
    page_server_data: { productRows: products },
  };
};
