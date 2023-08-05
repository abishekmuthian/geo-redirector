import { fail, error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { db } from "$lib/database";
import { Prisma } from "@prisma/client";
import countries from "$lib/data/countries.json";

let countryCodes: any = {};
let key: string;
for (let i = 0; i < countries.length; i++) {
  let key: any = countries[i]["cca2"];
  countryCodes[key] = countries[i]["name"]["common"];
}
// console.log("in product page - counrty code object: ", countryCodes);

//console.log("product/productname");
export const load = (async ({ params, locals }) => {
  console.log("Country in locals: ", locals.country);
  //console.log("Product name: ", params.name);
  //console.log("Product id: ", params.id);
  let productId = parseInt(params.id);
  //console.log(typeof productId, productId);
  // Get the country here

  //console.log("Country in the product server: ", locals.country);

  // Get the product url for the country using name and country code from the db
  const getProduct = await db.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
    select: {
      name: true,
      links: {
        where: {
          country: locals.country,
        },
        select: {
          country: true,
          url: true,
        },
      },
      analytics: {
        where: {
          country: countryCodes[locals.country],
        },
        select: {
          id: true,
        },
      },
    },
  });
  console.log("get product:::", getProduct);
  console.log("visits:::", getProduct?.analytics.length);

  //console.log("Required country URL", getProduct?.links[0]["url"]);

  if (getProduct?.analytics.length === 0) {
    console.log("when no visits already");
    let visitDetails = {};
    try {
      const result = await db.product.update({
        where: {
          id: parseInt(params.id),
        },
        data: {
          analytics: {
            create: {
              country: countryCodes[locals.country],
              views: 1,
            },
          },
        },
        include: {
          analytics: true,
        },
      });
    } catch (e) {
      console.log("error in visit add");
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return fail(400, { duplicateCountry: true });
        }
      }
      throw e;
    }
  } else if (getProduct?.analytics.length) {
    console.log("country already visited");
    try {
      const result = await db.analytics.update({
        where: {
          id: getProduct?.analytics[0].id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    } catch (e) {
      console.log("error in visit increment");
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return fail(400, { duplicateCountry: true });
        }
      }
      throw e;
    }
  }

  // update/add url visit
  // try {
  //   const result = await db.product.update({
  //     where: {
  //       id: product?.id,
  //     },
  //     data: {
  //       name: productname,

  //       links: {
  //         deleteMany: {},
  //         create: inputLinks,
  //       },
  //     },
  //     include: {
  //       links: true,
  //     },
  //   });
  // } catch (e) {
  //   if (e instanceof Prisma.PrismaClientKnownRequestError) {
  //     if (e.code === "P2002") {
  //       return fail(400, { duplicateCountry: true });
  //     }
  //   }
  //   throw e;
  // }

  // update/add url

  let productURL = "";
  try {
    productURL = getProduct?.links[0]["url"] || "/";
  } catch {
    throw error(404, {
      message: "No URL to redirect to, Please contact your seller.",
    });
  }

  // Redirect to that product url
  throw redirect(302, productURL);
}) satisfies PageServerLoad;
