import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // we only use this endpoint for the api
  // and don't need to see the page
  //console.log("Inside logout PageServerLoad");
  throw redirect(303, "/");
};

export const actions: Actions = {
  default({ cookies }) {
    // eat the cookie
    cookies.set("session", "", {
      path: "/",
      expires: new Date(0),
    });

    //console.log("Inside actions of logout");

    // redirect the user
    throw redirect(303, "/");
  },
};
