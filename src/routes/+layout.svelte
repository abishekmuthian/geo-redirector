<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
</script>

<svelte:head>
  <title>Geo Redirector</title>
</svelte:head>

<nav>
  <div class="navbar bg-base-200">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl" href="/">Geo Redirector</a>
    </div>
    <div class="flex-none hidden md:block">
      <ul class="menu menu-horizontal p-0">
        <!--   {#if !$page.data.user}
    <a class="link" href="/login">Login</a>
    <a href="/register">Register</a>
  {/if} -->
        {#if $page.data.user}
          <!-- <a href="/admin">Admin</a> -->
          <!-- <a href="/productsList">Products</a> -->
          <form action="/logout" method="POST" use:enhance>
            <button class="btn" type="submit">Logout</button>
          </form>
          <!-- <form action="/productsList" use:enhance>
          <button type="submit">Products Page</button>
        </form> -->
        {/if}
      </ul>
    </div>
  </div>
</nav>

<main>
  <slot />
</main>
