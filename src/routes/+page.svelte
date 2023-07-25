<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
  // export let registerFlag = process.env.REGISTER;
  export let registerFlag = false;

  console.log("Register flag is:", registerFlag);
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Geo Redirector</h1>
      <p class="py-6">Redirect links based on country.</p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        {#if !registerFlag}
          <form action="?/login" method="POST" use:enhance>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                class="input input-bordered"
              />
              <!--           <label class="label">
              <a                     data-sveltekit-preload-data="tap"
 href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label> -->
            </div>
            {#if form?.invalid}
              <div class="alert alert-error mt-4">
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
                <span>Username and password is required.</span>
              </div>
            {/if}

            {#if form?.credentials}
              <div class="alert alert-error mt-4">
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
                <span>You have entered the wrong credentials.</span>
              </div>
            {/if}
            <span
              >Click <a
                data-sveltekit-preload-data="tap"
                on:click={() => (registerFlag = !registerFlag)}>here</a
              >
              to register.</span
            >
            <div class="form-control mt-6">
              <button class="btn btn-primary" type="submit">Login</button>
            </div>
          </form>
        {:else}
          <form action="?/register" method="POST" use:enhance>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                class="input input-bordered"
              />
              <!--           <label class="label">
              <a                     data-sveltekit-preload-data="tap"
 href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label> -->
            </div>
            {#if form?.user}
              <div class="alert alert-error mt-4">
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
                <span>Username is taken.</span>
              </div>
            {/if}
            <span
              >Click <a
                data-sveltekit-preload-data="tap"
                on:click={() => (registerFlag = !registerFlag)}>here</a
              >
              to login.</span
            >
            <div class="form-control mt-6">
              <button class="btn btn-primary" type="submit">Register</button>
            </div>
          </form>
        {/if}
      </div>
    </div>
  </div>
</div>
