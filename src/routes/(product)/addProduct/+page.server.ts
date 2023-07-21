import { fail, redirect, type RequestHandler } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { db } from "$lib/database";

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

const addProduct: Action = async ({ request }) => {
  const data = await request.formData();

  const vals = [...data.values()];

  let inputLinks = buildLinksArray(vals);
  console.log(inputLinks);

  console.log("items: ", [...data.entries()]);
  console.log("vals: ", [...data.values()]);
  console.log("obj: ", Object.fromEntries(data.entries()));

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
    where: { name: productname },
  });

  if (product) {
    return fail(400, { product: true });
  }

  const products = await db.product.findMany();

  console.log("record create");
  const result = await db.product.create({
    data: {
      name: productname,

      links: {
        create: inputLinks,
      },
    },
    include: {
      links: true,
    },
  });
  console.log(result);

  throw redirect(303, "/productsList");
};

export const actions: Actions = { addProduct };
