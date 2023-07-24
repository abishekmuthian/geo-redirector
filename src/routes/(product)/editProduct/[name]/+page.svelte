<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";

  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import countries from "$lib/data/countries.json";

  export let data: PageData;
  let submitting;

  let fetchedData = data.page_server_data.productRow;
  let productName = fetchedData?.name;
  let linksArr = fetchedData?.links;
  let selected: string = "-Select Country-";

  let countryCodes = [];
  let key: string;
  for (let i = 0; i < countries.length; i++) {
    let key = countries[i]["cca2"];
    countryCodes.push({ [key]: countries[i]["name"]["common"] });
  }

  let values: { country: string; url: string }[] = [];
  if (fetchedData?.links.length) {
    for (let i = 0; i < fetchedData?.links.length; i++) {
      values.push(fetchedData?.links[i]);
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

<div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full lg:max-w-[680px] max-w-xl">
    <div class="overflow-x-auto">
      <h1 class="text-4xl font-medium mb-5">Edit Product</h1>

      <form
        method="POST"
        use:enhance
        enctype="multipart/form-data"
        on:submit={(e) => (submitting = true)}
      >
        <div>
          <label for="productname">Product Name</label>
          <input
            class="input input-bordered w-full max-w-2xl"
            id="productname"
            name="productname"
            type="text"
            bind:value={productName}
            required
          />
        </div>

        <div class="links">
          {#each values as v, i}
            <div class="link grid grid-cols-2 gap-2">
              <div>
                <label for="country">Country</label>
                <select
                  class="select select-bordered w-full max-w-xs"
                  name="country"
                  id="country"
                >
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
                  class="input input-bordered w-full max-w-xs"
                  id="url"
                  name="url"
                  type="text"
                  bind:value={values[i].url}
                  required
                />
              </div>
            </div>
          {/each}
          <div class="add-remove-links mt-4">
            <div class="float-left">
              <button class="btn btn-info" on:click|preventDefault={addLinks}
                >Add</button
              >
              {#if values.length >= 2}
                <button
                  class="btn btn-error"
                  type="button"
                  value="Remove"
                  on:click={removeLinks}>Remove</button
                >
              {/if}
            </div>

            <button class="btn btn-primary float-right" type="submit"
              >Save Product</button
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
