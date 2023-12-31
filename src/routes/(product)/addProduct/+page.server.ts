import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { db } from "$lib/database";
import { Prisma } from "@prisma/client";

let localUserName: string = "";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    localUserName = locals.user.name;
  } else {
    throw redirect(303, "/");
  }
};

function isUrlValid(inputURL: string) {
  try {
    new URL(inputURL);
    return true;
  } catch (err) {
    return false;
  }
}

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
  for (let i = 0; i < inputLinks.length; i++) {
    if (!isUrlValid(inputLinks[i]["url"])) {
      return fail(400, { invalidURL: true });
    }
  }

  const product = await db.product.findUnique({
    where: {
      name_owner: {
        name: productname,
        owner: localUserName,
      },
    },
  });

  if (product) {
    return fail(400, { product: true });
  }

  try {
    const result = await db.product.create({
      data: {
        name: productname,
        owner: localUserName,

        links: {
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
        return fail(400, { duplicateCountry: true });
      }
    }
    throw e;
  }

  throw redirect(303, "/productsList");
};

export const actions: Actions = { addProduct };
