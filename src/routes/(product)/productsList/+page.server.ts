import type { PageServerLoad } from "./$types";
import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    const products = await db.product.findMany({
      where: {
        owner: locals.user.name,
      },
      select: {
        id: true,
        name: true,
        links: {
          select: {
            country: true,
            url: true,
          },
        },
      },
    });
    return {
      page_server_data: { productRows: products },
    };
  } else {
    throw redirect(303, "/");
  }
};
