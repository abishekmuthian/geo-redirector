import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database";

export const load = (async ({ params: { name }, locals }) => {
  if (locals.user) {
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
    const removedLinks = await db.product.update({
      where: {
        id: deleteProduct?.id,
      },
      data: {
        links: {
          deleteMany: {},
        },
        analytics: {
          deleteMany: {},
        },
      },
      include: {
        links: true,
      },
    });

    const deletedProduct = await db.product.delete({
      where: {
        id: deleteProduct?.id,
      },
    });

    throw redirect(302, "/productsList");
  } else {
    throw redirect(303, "/");
  }
}) satisfies PageServerLoad;
