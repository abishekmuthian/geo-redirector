<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { redirect } from "@sveltejs/kit";
  import { goto } from "$app/navigation";

  export let data: PageData;

  // let fetchedData = data.page_server_data.productRows;
  $: fetchedData = data.page_server_data.productRows;
  console.log("page.data.user: ", data.user);

  export let siteUrl = "";

  if (browser) {
    const { protocol, host } = window.location;
    siteUrl = `${protocol}//${host}`;
  }
  const handleDelete = (item: any) => {
    console.log("item: ", item);
    let newTableData = fetchedData.filter((row) => row.id !== item.id);
    console.log("new table data: ", newTableData[0], newTableData[1]);
    fetchedData = [...newTableData];
    let newUrl = `/deleteProduct/${encodeURI(item.name)}`;
    console.log("new url: ", newUrl);

    // throw redirect(302, `/deleteProduct/${encodeURI(item.name)}`);

    goto(newUrl);
    // on:click={() => handleDelete(item)}
  };
</script>

<div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full lg:max-w-[680px] max-w-xl">
    {#if fetchedData.length === 0}
      <!-- No Table -->
      <div class="text-right mt-2">
        {#if $page.data.user}
          <div class="hero-content text-center">
            <div class="max-w-md">
              <h1 class="text-5xl font-bold">
                Automatic URL <br /> Redirection
              </h1>
              <p class="py-6">
                Add the Product, URL according to the countries and you will get
                a single link to share with your customers.
              </p>
              <a
                class="btn btn-primary text-center"
                data-sveltekit-preload-data="tap"
                href="/addProduct">Add Products</a
              >
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <div class="overflow-x-auto">
        <h1 class="text-4xl font-medium mb-5">Products</h1>
        <!-- No table -->
        <table class="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Link</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {#each fetchedData as item, index}
              <tr>
                <td>{item.name}</td>
                <td>
                  <a
                    class="link"
                    href="{`${siteUrl}`}/product/{`${encodeURI(
                      item.name
                    )}`}/{item.id}"
                    >{`${siteUrl}`}/product/{`${encodeURI(
                      item.name
                    )}`}/{item.id}</a
                  >
                </td>
                <td>
                  <a
                    class="btn btn-accent"
                    data-sveltekit-preload-data="tap"
                    href="/editProduct/{`${encodeURI(item.name)}`}">Edit</a
                  >
                  <!-- <a
                    class="btn btn-neutral"
                    data-sveltekit-preload-data="tap"
                    on:click|once={() => handleDelete(item)}
                    href="/deleteProduct/{`${encodeURI(item.name)}`}">Delete</a
                  > -->
                  <button
                    class="btn btn-neutral"
                    on:click={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="text-right mt-2">
        {#if $page.data.user}
          <a
            class="btn btn-primary"
            data-sveltekit-preload-data="tap"
            href="/addProduct">Add Products</a
          >
        {/if}
      </div>
    {/if}
  </div>
</div>
