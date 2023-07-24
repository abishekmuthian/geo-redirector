<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  let fetchedData = data.page_server_data.productRows;
  console.log("page.data.user: ", data.user);
</script>

<div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full lg:max-w-[680px] max-w-xl">
    <div class="overflow-x-auto">
      <h1 class="text-4xl font-medium mb-5">Products</h1>
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
                localhost.com/product/{`${encodeURI(item.name)}`}
              </td>
              <td>
                <button class="btn btn-accent">
                  <a href="/editProduct/{`${encodeURI(item.name)}`}">Edit</a>
                </button>
                <button class="btn btn-neutral">
                  <a href="/deleteProduct/{`${encodeURI(item.name)}`}">Delete</a
                  >
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="text-right mt-2">
      {#if $page.data.user}
        <button class="btn btn-primary">
          <a href="/addProduct">Add Products</a>
        </button>
      {/if}
    </div>
  </div>
</div>
