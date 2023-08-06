import type { LayoutServerLoad } from "./$types";

// Set data to be accessed in the page
export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
  };
};
