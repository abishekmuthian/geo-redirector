import type { PageServerLoad } from "./$types";
import { db } from "$lib/database";
// edit
import { fail, redirect, type RequestHandler } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";

//
export const load: PageServerLoad = async ({ params: { name } }) => {
  const editProduct = await db.product.findUnique({
    where: { name: name },
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
  console.log("edit product:::", editProduct);
  return {
    page_server_data: { productRow: editProduct },
  };
};

console.log("before new edit function");
// edit Product - save it in the database
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
    console.log("actions");
    const data = await request.formData();
    // console.log(formData);

    const vals = [...data.values()];

    let inputLinks = buildLinksArray(vals);
    console.log(inputLinks);

    console.log("edit vals: ", [...data.values()]);

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
      console.log("product fetched for update");
    }
    console.log("record create");
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
    console.log("edit result: ", result);

    throw redirect(303, "/productsList");

    // throw redirect(303, `/editProduct/${params.name}`);
  },
};

// console.log("before edit function");
// const editProduct: Action = async ({ request }) => {
//   const data = await request.formData();

//   const vals = [...data.values()];

//   let inputLinks = buildLinksArray(vals);
//   console.log(inputLinks);

//   console.log("edit vals: ", [...data.values()]);

//   const productname = data.get("productname");

//   if (typeof productname !== "string") return fail(400, { invalid: true });
//   for (let i = 0; i < inputLinks.length; i++) {
//     if (
//       typeof inputLinks[i]["country"] !== "string" ||
//       typeof inputLinks[i]["url"] !== "string"
//     ) {
//       return fail(400, { invalid: true });
//     }
//   }

//   const product = await db.product.findUnique({
//     where: { name: productname },
//   });

//   if (product) {
//     return fail(400, { product: true });
//   }

//   const products = await db.product.findMany();

//   console.log("record create");
//   const result = await db.product.create({
//     data: {
//       name: productname,

//       links: {
//         create: inputLinks,
//       },
//     },
//     include: {
//       links: true,
//     },
//   });
//   console.log(result);

//   throw redirect(303, "/productsList");
// };

// export const actions: Actions = { editProduct };
