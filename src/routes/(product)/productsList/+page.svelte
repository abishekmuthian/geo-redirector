<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";

  export let data: PageData;

  $: fetchedData = data.page_server_data.productRows;

  export let siteUrl = "";

  if (browser) {
    const { protocol, host } = window.location;
    siteUrl = `${protocol}//${host}`;
  }
  const handleDelete = (item: any) => {
    let newTableData = fetchedData.filter((row) => row.id !== item.id);
    fetchedData = [...newTableData];
    let newUrl = `/deleteProduct/${encodeURI(item.name)}`;

    goto(newUrl);
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
                data-sveltekit-preload-data="off"
                href="/addProduct">Add Products</a
              >
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <h1 class="text-4xl font-medium mb-5">Products</h1>
      <div class="overflow-x-auto">
        <table class="table lg:table-lg sm:table-xs">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Link</th>
              <th>Analytics|Edit|Delete</th>
            </tr>
          </thead>
          <tbody>
            {#each fetchedData as item, index}
              <tr>
                <td>{item.name}</td>
                <td>
                  <a
                    data-sveltekit-preload-data="off"
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
                  <div class="grid grid-rows-3 gap-2">
                    <a
                      class="btn btn-secondary"
                      data-sveltekit-preload-data="off"
                      href="/product/{`${encodeURI(item.name)}`}/{`${encodeURI(
                        item.id
                      )}`}/analytics"
                      >Analytics
                    </a>
                    <a
                      class="btn btn-accent"
                      data-sveltekit-preload-data="off"
                      href="/editProduct/{`${encodeURI(item.name)}`}">Edit</a
                    >
                    <button
                      class="btn btn-neutral"
                      on:click={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
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
            data-sveltekit-preload-data="off"
            href="/addProduct">Add Products</a
          >
        {/if}
      </div>
    {/if}
  </div>
</div>
