import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals, params }) => {
  if (locals.user) {
    const analyticsData = new Map();

    // Fetch product with name
    // Iterate Analytics and set the country & views
    analyticsData.set("Sri Lanka", 10);
    analyticsData.set("India", 20);
    analyticsData.set("Bhutan", 5);

    return {
      analyticsData: analyticsData,
    };
  }
};
