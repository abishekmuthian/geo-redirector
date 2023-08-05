<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;
  import countries from "$lib/data/countries.json";

  let productName = "";

  let values = [
    {
      country: "",
      url: "",
    },
  ];

  const addLinks = () => {
    //console.log("add links function");
    values = [...values, { country: "", url: "" }];
  };
  const removeLinks = () => {
    values = values.slice(0, values.length - 1);
  };

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

  let countryCodes: any = {};
  let key: string;
  for (let i = 0; i < countries.length; i++) {
    let key: any = countries[i]["cca2"];
    countryCodes[key] = countries[i]["name"]["common"];
  }
  const clearMessages = () => {
    if (form) {
      form.product = "";
      form.invalidURL = "";
    }
  };
</script>

<div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full lg:max-w-[680px] max-w-xl">
    <div class="overflow-x-auto">
      <h1 class="text-4xl font-medium mb-5">Add Product</h1>

      <form class="m-2" action="?/addProduct" method="POST" use:enhance>
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
            on:focus={clearMessages}
          />
        </div>

        <div class="links">
          {#each values as v, i}
            <div class="link">
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="label" for="country">Country</label>
                  <select
                    class="select select-bordered w-full max-w-xs"
                    bind:value={values[i]["country"]}
                    name="country"
                    id="country"
                    required
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
                    type="url"
                    bind:value={values[i].url}
                    required
                    on:focus={clearMessages}
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
          {#if form?.duplicateCountry}
            <p class="error">Country should be unique!</p>
          {/if}

          {#if duplicates.length > 0}
            <div class="alert alert-error mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
              >
              <span>Duplicate country - {countryCodes[duplicates[0]]}</span>
            </div>
          {:else}{""}
          {/if}
          {#if form?.invalidURL}
            <div class="alert alert-error mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
              >
              <span>URL is invalid. Kindly add the protocol.</span>
            </div>
          {/if}

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

            <div>
              {#if duplicates.length > 0}
                <button
                  disabled
                  class="btn btn-primary float-right"
                  type="submit">Add Product</button
                >
              {:else}
                <button class="btn btn-primary float-right" type="submit"
                  >Add Product</button
                >
              {/if}
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
