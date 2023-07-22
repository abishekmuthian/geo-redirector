<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";

  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import countries from "$lib/data/countries.json";

  export let data: PageData;
  let submitting;

  let fetchedData = data.page_server_data.productRow;

  console.log("data in edit pages: ", fetchedData);
  let productName = fetchedData?.name;
  let linksArr = fetchedData?.links;
  let selected: string = "-Select Country";

  let countryCodes = [];
  let key: string;
  for (let i = 0; i < countries.length; i++) {
    // let key = countries[i]["name"]["common"];
    let key = countries[i]["cca2"];
    countryCodes.push({ [key]: countries[i]["name"]["common"] });
  }

  // console.log(countryCodes);
  // console.log(countryCodes["DE"]);

  let values: { country: string; url: string }[] = [];
  if (fetchedData?.links.length) {
    for (let i = 0; i < fetchedData?.links.length; i++) {
      values.push(fetchedData?.links[i]);

      // console.log("country::: ", fetchedData?.links[i].country);

      // values.push({
      //   ...fetchedData?.links[i],
      //   country: countryCodes[[fetchedData?.links[i].country]],
      // });
    }
  }
  console.log("values:0 ", values[0]);

  const addLinks = () => {
    values = [...values, { country: "", url: "" }];
  };
  const removeLinks = () => {
    values = values.slice(0, values.length - 1);
  };
</script>

<h1>Edit Product</h1>

<form
  method="POST"
  use:enhance
  enctype="multipart/form-data"
  on:submit={(e) => (submitting = true)}
>
  <div>
    <label for="productname">Product Name</label>
    <input
      id="productname"
      name="productname"
      type="text"
      bind:value={productName}
      required
    />
  </div>

  <div class="links">
    {#each values as v, i}
      <div class="link">
        <div>
          <label for="country">Country</label>
          <!-- <input
            id="country"
            name="country"
            type="text"
            bind:value={values[i].country}
            required
          /> -->
          <select name="country" id="country">
            {#if !values[i]["country"]}
              <option disabled value="" selected>-Select country-</option>
              {#each countries as country, index}
                <option value={country["cca2"]}>
                  {country["name"]["common"]}
                </option>
              {/each}
            {:else}
              {#each countries as country, index}
                {#if country["cca2"] === values[i].country}
                  <option value={country["cca2"]} selected>
                    {country["name"]["common"]}
                  </option>
                {:else}
                  <option value={country["cca2"]}>
                    {country["name"]["common"]}
                  </option>
                {/if}
              {/each}
            {/if}
          </select>
        </div>
        <div>
          <label for="url">URL</label>
          <input
            id="url"
            name="url"
            type="text"
            bind:value={values[i].url}
            required
          />
        </div>
      </div>
    {/each}
    <div class="add-remove-links">
      <div>
        <button on:click|preventDefault={addLinks}>Add</button>
      </div>
      {#if values.length >= 2}
        <div>
          <input type="button" value="Remove" on:click={removeLinks} />
        </div>
      {/if}
    </div>

    <!-- {#if form?.product}
      <p class="error">
        Product is already in database. Please add the new product.
      </p>
    {/if} -->

    <button type="submit">Save Product</button>
  </div>
</form>

<style>
  .link {
    display: flex;
    flex-direction: row;
  }

  .add-remove-links {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  form {
    margin: 5px;
  }

  /* .error {
    color: tomato;
  } */
  div {
    margin-bottom: 5px;
    gap: 10px;
  }
</style>
