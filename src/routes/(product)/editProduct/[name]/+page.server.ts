import type { PageServerLoad } from "./$types";
import { db } from "$lib/database";

import { fail, redirect, type RequestHandler } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";
import { Prisma } from "@prisma/client";

export const load: PageServerLoad = async ({ params: { name }, locals }) => {
  if (locals.user) {
    console.log("username in edit product page server: ", locals.user);
  }
  const editProduct = await db.product.findUnique({
    where: {
      name_owner: {
        name: name,
        owner: locals.user.name,
      },
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

  return {
    page_server_data: { productRow: editProduct },
  };
};

function buildLinksArray(arr = []) {
  let output = [];
  let country = "";
  let url = "";
  let i = 1;
  while (i < arr.length - 1) {
    country = arr[i];
    url = arr[i + 1];
    output.push({ country, url });
    i += 2;
  }
  return output;
}

export const actions = {
  default: async ({ request, locals, params }) => {
    const data = await request.formData();
    const vals: any = [...data.values()];
    let inputLinks = buildLinksArray(vals);

    const productname = data.get("productname");

    if (typeof productname !== "string") return fail(400, { invalid: true });
    for (let i = 0; i < inputLinks.length; i++) {
      if (
        typeof inputLinks[i]["country"] !== "string" ||
        typeof inputLinks[i]["url"] !== "string"
      ) {
        return fail(400, { invalid: true });
      }
    }
    const product = await db.product.findUnique({
      where: {
        name_owner: {
          name: productname,
          owner: locals.user.name,
        },
      },
    });
    if (product) {
      console.log("product fetched for update");
    }

    try {
      const result = await db.product.update({
        where: {
          id: product?.id,
        },
        data: {
          name: productname,

          links: {
            deleteMany: {},
            create: inputLinks,
          },
        },
        include: {
          links: true,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          console.log("Edit error: Duplicate country is not allowed.");
          return fail(400, { duplicateCountry: true });
        }
      }
      throw e;
    }

    throw redirect(303, "/productsList");
  },
};
