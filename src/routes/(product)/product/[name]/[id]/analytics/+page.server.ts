import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals }) => {
  //   if (locals.user) {

  const analyticsData = new Map();
  analyticsData.set("Sri Lanka", 10);
  analyticsData.set("India", 20);
  analyticsData.set("Bhutan", 5);

  return {
    analyticsData: analyticsData,
  };
  //   }
};
