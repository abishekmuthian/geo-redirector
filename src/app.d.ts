// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user: {
        name: string;
        role: string;
      };
      country: string;
      URL: string;
    }
    interface PageData {
      registrationSuccess: boolean;
      registerFlag: boolean;
    }
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
