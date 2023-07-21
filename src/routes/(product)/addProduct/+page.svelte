<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  console.log("in form page");
  let productName = "";
  // $: details = { name: productName, links: values };

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

  let submit;
  function handleSubmit() {
    // Send a POST request to src/routes/contact/+server.ts endpoint
    submit = fetch("/addProduct", {
      method: "POST",
      body: JSON.stringify({ foo: "product details" }),
      headers: { "content-type": "application/json" },
    })
      .then((resp) => resp.json())
      .finally(() => setTimeout(() => (submit = null), 5000));
  }
</script>

<h1>Add Product</h1>

<form action="?/addProduct" method="POST">
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
          <input
            id="country"
            name="country"
            type="text"
            bind:value={values[i].country}
            required
          />
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

    {#if form?.product}
      <p class="error">
        Product is already in database. Please add the new product.
      </p>
    {/if}

    <button type="submit">Add Product</button>
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

  .error {
    color: tomato;
  }
  div {
    margin-bottom: 5px;
    gap: 10px;
  }
</style>
