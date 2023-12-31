import { fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import type { Action, Actions, PageServerLoad } from "./$types";

import { db } from "$lib/database";

enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

// Handle redirection on home page load
export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/productsList");
  } else {
    return {
      registerFlag: false,
    };
  }
};

// Handle login
const login: Action = async ({ cookies, request }) => {
  const data = await request.formData();
  const username = data.get("username");
  const password = data.get("password");

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username ||
    !password
  ) {
    return fail(400, { invalid: true });
  }

  const user = await db.user.findUnique({ where: { username } });

  if (!user) {
    return fail(400, { credentials: true });
  }

  const userPassword = await bcrypt.compare(password, user.passwordHash);

  if (!userPassword) {
    return fail(400, { credentials: true });
  }

  const authenticatedUSer = await db.user.update({
    where: { username: user.username },
    data: { userAuthToken: crypto.randomUUID() },
  });

  cookies.set("session", authenticatedUSer.userAuthToken, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });

  throw redirect(302, "/productsList");
};

const register: Action = async ({ request }) => {
  const data = await request.formData();
  const username = data.get("username");
  const password = data.get("password");

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username ||
    !password
  ) {
    return fail(400, { invalid: true });
  }

  if (
    (() => {
      let regexp = new RegExp(/^[a-zA-Z0-9_]+$/);
      let test = regexp.test(username);
      return !test;
    })()
  ) {
    return fail(400, { invalid_username: true });
  }

  const user = await db.user.findUnique({
    where: { username },
  });

  if (user) {
    return fail(400, { user: true });
  }

  await db.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID(),
      role: Roles.USER,
    },
  });

  return {
    registrationSuccess: true,
  };
};

export const actions: Actions = { login, register };
