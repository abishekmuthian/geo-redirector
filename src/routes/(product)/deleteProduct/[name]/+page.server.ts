import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database";
import type { Action, Actions } from "./$types";
import type Page from "../../../+page.svelte";

//
export const load = (async ({ params: { name }, locals }) => {
  console.log("delete name: ", name);
  const deleteProduct = await db.product.findUnique({
    where: {
      name_owner: {
        name: name,
        owner: locals.user.name,
      },
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
  // console.log("delete product:::", deleteProduct);
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
  // console.log("removedLinks ", removedLinks);

  const deletedProduct = await db.product.delete({
    where: {
      id: deleteProduct?.id,
    },
  });
  console.log("Deleted Product ", deletedProduct);

  throw redirect(302, "/productsList");
}) satisfies PageServerLoad;
