import { fail, redirect, type RequestHandler } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { db } from "$lib/database";
import { Prisma } from "@prisma/client";
// import type { PageData } from "./$types";
// import type { PageData } from "./$types";

// export let data: PageData;

// - username fetch
let localUserName: string = "";

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if logged in
  if (locals.user) {
    localUserName = locals.user.name;
    console.log("username in add product page server: ", locals.user);
  }
};
// - username fetch

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

  // const product = await db.user.findFirst({
  //   include: {
  //     products: {
  //       where: {
  //         name: productname,
  //         ownerId: localUserName,
  //       },
  //     },
  //   },
  // });

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

  console.log("product in add: ", product);

  // const products = await db.product.findMany();
  let newProduct = {
    name: productname,
    links: inputLinks,
  };

  console.log("record create");
  // const result = await db.product.create({
  //   data: {
  //     name: productname,
  //     owner: localUserName,

  //     links: {
  //       create: inputLinks,
  //     },
  //   },
  //   include: {
  //     links: true,
  //   },
  // });
  // console.log(result);

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
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
        return fail(400, { duplicateCountry: true });
      }
    }
    throw e;
  }

  throw redirect(303, "/productsList");
};

export const actions: Actions = { addProduct };
