import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { db } from "$lib/database";

export const load: PageServerLoad = async ({ locals, params }) => {
  if (locals.user) {
    // Get the product url for the country using name and country code from the db
    const getProduct = await db.product.findUnique({
      where: {
        id: parseInt(params.id),
      },
      select: {
        analytics: true,
      },
    });
    console.log("get analtics product:::", getProduct);
    console.log("visits:::", getProduct?.analytics.length);
    const analyticsData = new Map();
    // Fetch product
    // Iterate Analytics and set the country & views

    if (getProduct?.analytics.length) {
      for (let i = 0; i < getProduct?.analytics.length; i++) {
        let countryName = getProduct.analytics[i]["country"];
        let viewCount = getProduct.analytics[i]["views"];
        analyticsData.set(countryName, viewCount);
      }
    }

    return {
      analyticsData: analyticsData,
    };
  } else {
    throw redirect(303, "/");
  }
};
