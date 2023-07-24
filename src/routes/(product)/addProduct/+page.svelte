<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;
  import countries from "$lib/data/countries.json";
  let selected: string = "-Select Country";

  // let countryCodes = [];
  // for (let i = 0; i < countries.length; i++) {
  //   console.log(countries[i]["name"]["common"]);
  //   console.log(countries[i]["cca2"]);
  // }

  console.log("in form page");
  let productName = "";

  let values = [
    {
      country: "",
      url: "",
    },
  ];
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
      <h1 class="text-4xl font-medium mb-5">Add Product</h1>

      <form action="?/addProduct" method="POST" use:enhance>
        <div>
          <label for="productname">Product Name</label>
          <input
            class="input input-bordered w-full max-w-2xl"
            id="productname"
            name="productname"
            placeholder="Product Name"
            type="text"
            bind:value={productName}
            required
          />
        </div>

        <div class="links">
          {#each values as v, i}
            <div class="link">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="label" for="country">Country</label>
                  <!-- <input
              id="country"
              name="country"
              type="text"
              bind:value={values[i].country}
              required
            /> -->
                  <select
                    class="select select-bordered w-full max-w-xs"
                    value={selected}
                    name="country"
                    id="country"
                    on:select={() => (values[i]["country"] = selected)}
                  >
                    <option disabled value="">-Select country-</option>
                    {#each countries as country, index}
                      <option value={country["cca2"]}>
                        {country["name"]["common"]}
                      </option>
                    {/each}
                  </select>
                </div>
                <div>
                  <label class="label" for="url">URL</label>
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
            </div>
          {/each}
          {#if form?.product}
            <p class="error">
              Product is already in database. Please add the new product.
            </p>
          {/if}
          <div class="add-remove-links mt-4">
            <div class="float-left">
              <button class="btn btn-accent" on:click|preventDefault={addLinks}
                >Add</button
              >
              {#if values.length >= 2}
                <button
                  class="btn btn-neutral"
                  type="button"
                  value="Remove"
                  on:click|preventDefault={removeLinks}>Remove</button
                >
              {/if}
            </div>

            <div>
              <button class="btn btn-primary float-right" type="submit"
                >Add Product</button
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
