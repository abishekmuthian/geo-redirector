import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database";
import type { Action, Actions } from "./$types";

//
export const load: Actions = (async ({ params: { name } }) => {
  const deleteProduct = await db.product.findUnique({
    where: { name: name },
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
  console.log("delete product:::", deleteProduct);
  const removedLinks = await db.product.update({
    where: {
      id: deleteProduct?.id,
    },
    data: {
      links: {
        deleteMany: {},
      },
    },
    include: {
      links: true,
    },
  });
  console.log("removedLinks ", removedLinks);

  throw redirect(303, "/productsList");
}) satisfies Actions;
