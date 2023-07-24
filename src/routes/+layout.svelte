<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
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
            <button class="btn btn-accent" type="submit">Logout</button>
          </form>
          <!-- <form action="/productsList" use:enhance>
          <button type="submit">Products Page</button>
        </form> -->
        {/if}
      </ul>
    </div>
    <div id="burger" class="px-4 cursor-pointer md:hidden">
      <svg
        class="w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  </div>
</nav>

<main>
  <slot />
</main>
