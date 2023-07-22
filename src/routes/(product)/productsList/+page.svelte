<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  // import { db } from "$lib/database";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  let fetchedData = data.page_server_data.productRows;

  // console.log("data in pages: ", data.page_server_data.productRows);
</script>

<br />
{#if $page.data.user}
  <button>
    <a href="/addProduct">Add Products</a>
  </button>

  <br />
{/if}

<br />
<table>
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
          <button>
            <a href="/editProduct/{`${encodeURI(item.name)}`}">Edit</a>
          </button>
          <button>
            Delete
            <!-- <a href="/deleteProduct/{`${encodeURI(item.name)}`}">Delete</a> -->
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table,
  th,
  td {
    border: 1px solid dodgerblue;
    padding: 2px;
  }

  table {
    border-collapse: collapse;
  }
  .link-country {
    width: 50%;
  }
  .link-url {
    width: 50%;
  }

  a {
    text-decoration: none;
    font-weight: 700;
  }
  .links-table {
    width: 100%;
  }
</style>
