<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import { applyAction, enhance } from "$app/forms";
  import { goto, invalidate, invalidateAll } from "$app/navigation";

  export let form: ActionData;

  export let data: PageData;

  export let registrationSuccess = false;

  export let registerFlag = false;

  $: registrationSuccess = form?.registrationSuccess;

  $: registerFlag = data.registerFlag;

  //console.log("Page Data: ", data);

  //console.log("RegistrationSuccess is:", registrationSuccess);

  //console.log("Register flag is:", registerFlag);
  const clearMessages = () => {
    if (form) {
      form.credentials = "";
      form.invalid = "";
    }
  };
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
                on:focus={clearMessages}
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
                on:focus={clearMessages}
              />
              <!--           <label class="label">
              <a                     data-sveltekit-preload-data="off"
 href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label> -->
            </div>
            {#if form?.invalid}
              <div class="alert alert-error mt-4">
                <span>Username and password is required.</span>
              </div>
            {/if}

            {#if form?.credentials}
              <div class="alert alert-error mt-4">
                <span>You have entered the wrong credentials.</span>
              </div>
            {/if}
            {#if registrationSuccess}
              <div class="alert alert-info mt-4">
                <span
                  >Registration successful, Login with your credentials.</span
                >
              </div>
            {:else}
              <div class="mt-4">
                <span
                  >Click <a
                    class="link"
                    data-sveltekit-preload-data="off"
                    on:click={() => (registerFlag = !registerFlag)}
                    href="">here</a
                  >
                  to register.</span
                >
              </div>
            {/if}
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
                minlength="8"
                required
              />
              <!--           <label class="label">
              <a                     data-sveltekit-preload-data="off"
 href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label> -->
            </div>
            {#if form?.user}
              <div class="alert alert-error mt-4">
                <span>Username is taken.</span>
              </div>
            {/if}
            {#if form?.registrationSuccess}
              <div class="toast">
                <div class="alert alert-info">
                  <span>New message arrived.</span>
                </div>
              </div>
              <!-- <p>Successful registration! Redirecting to login.</p> -->
              <!-- {() => (registerFlag = form?.registerFlag)}
              {@debug registerFlag} -->
              <!-- {goto("/")} -->
            {/if}
            <div class="mt-4">
              <span
                >Click <a
                  class="link"
                  data-sveltekit-preload-data="off"
                  on:click={() => (registerFlag = !registerFlag)}>here</a
                >
                to login.</span
              >
            </div>

            <div class="form-control mt-6">
              <button class="btn btn-primary" type="submit">Register</button>
            </div>
          </form>
        {/if}
      </div>
    </div>
  </div>
</div>
