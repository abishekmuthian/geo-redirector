<script lang="ts">
  import { enhance } from "$app/forms";

  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import countries from "$lib/data/countries.json";

  export let data: PageData;

  let submitting;

  let fetchedData = data.page_server_data.productRow;
  let productName = fetchedData?.name;
  let linksArr = fetchedData?.links;
  let selected: string = "-Select Country-";

  let countryCodes: any = {};
  let key: string;
  for (let i = 0; i < countries.length; i++) {
    let key: any = countries[i]["cca2"];
    countryCodes[key] = countries[i]["name"]["common"];
  }

  let values: { country: string; url: string }[] = [];
  if (fetchedData?.links.length) {
    for (let i = 0; i < fetchedData?.links.length; i++) {
      values.push(fetchedData?.links[i]);
    }
  }
  // console.log("values:0 ", values[0]);

  const addLinks = () => {
    values = [...values, { country: "", url: "" }];
  };
  const removeLinks = () => {
    values = values.slice(0, values.length - 1);
  };

  // duplicate countries logic
  function countryCount(arr: { country: string; url: string }[]) {
    let obj: any = {};
    let duplicateCountries = [];
    for (let i = 0; i < arr.length; i++) {
      if (obj[arr[i]["country"]]) {
        obj[arr[i]["country"]] += 1;
      } else {
        obj[arr[i]["country"]] = 1;
      }
    }

    for (let key in obj) {
      if (obj[key] > 1 && key) {
        duplicateCountries.push(key);
      }
    }

    return duplicateCountries;
  }
  //
  $: duplicates = countryCount(values);
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
            readonly
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
                  bind:value={values[i]["country"]}
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
              {#if duplicates.length > 0}
                <button
                  disabled
                  class="btn btn-accent"
                  on:click|preventDefault={addLinks}>Add</button
                >
              {:else}
                <button
                  class="btn btn-accent"
                  on:click|preventDefault={addLinks}>Add</button
                >
              {/if}
              {#if values.length >= 2}
                <button
                  class="btn btn-neutral"
                  type="button"
                  value="Remove"
                  on:click={removeLinks}>Remove</button
                >
              {/if}
            </div>
            {#if duplicates.length > 0}
              <button disabled class="btn btn-primary float-right" type="submit"
                >Save Product</button
              >
            {:else}
              <button class="btn btn-primary float-right" type="submit"
                >Save Product</button
              >
            {/if}
          </div>
        </div>
      </form>
      {#if duplicates.length > 0}
        <h1>
          Duplicate country - {countryCodes[duplicates[0]]}
        </h1>
      {:else}{""}
      {/if}
    </div>
  </div>
</div>
