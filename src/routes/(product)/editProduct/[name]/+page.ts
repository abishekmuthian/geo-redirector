import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, data }) => {
  await parent();
  let { page_server_data } = data;
  return {
    page_server_data,
    page_data: { productRow: {} },
  };
};
