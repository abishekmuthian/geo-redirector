import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  throw redirect(303, "/");
};

export const actions: Actions = {
  default({ cookies }) {
    // logout
    cookies.set("session", "", {
      path: "/",
      expires: new Date(0),
    });

    throw redirect(303, "/");
  },
};
