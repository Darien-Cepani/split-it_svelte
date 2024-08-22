<script lang="ts">
  import { Fa } from 'svelte-fa';
  import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
  
  export let darkMode: boolean = false;
  export let toggleDarkMode: () => void;

  let mobileMenuOpen = false;

  function toggleMobileMenu(): void {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<nav class="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
  <div class="w-fill mx-4">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="flex-shrink-0">
          <img class="h-8 w-auto" src={darkMode ? '/logoDark.png' : '/logo.png'} alt="SplitIt Logo">
        </a>
      </div>
      <div class="hidden md:block">
        <div class="ml-10 flex items-center space-x-4">
          <a href="/" class="flex flex-row items-center justify-center gap-2 bg-red-500 text-white dark:text-white hover:bg-red-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Fa icon={faTimes} class="text-xs" /> Close Bill</a>
          <button on:click={toggleDarkMode} class="bg-gray-400 text-white hover:bg-gray-600 hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500 p-3 rounded-md text-sm font-medium">
            <Fa icon={darkMode ? faSun : faMoon} />
          </button>
        </div>
      </div>
      <div class="md:hidden">
        <button on:click={toggleMobileMenu} type="button" class="bg-gray-200 dark:bg-gray-700 inline-flex items-center justify-center p-2 rounded-md  text-gray-800 dark:text-white hover:text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <Fa icon={mobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>
    </div>
  </div>

  <div class="md:hidden" id="mobile-menu" class:hidden={!mobileMenuOpen}>
    <div class="px-2 pt-2 pb-3 flex flex-row justify-end gap-2">
      <a href="/" class="flex flex-row items-center justify-center gap-2 bg-red-500 text-white dark:text-white hover:bg-red-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Fa icon={faTimes} class="text-xs" /> Close Bill</a>
          <button on:click={toggleDarkMode} class="bg-gray-400 text-white hover:bg-gray-600 hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500 p-3 rounded-md text-sm font-medium">
            <Fa icon={darkMode ? faSun : faMoon} />
          </button>
    </div>
  </div>
</nav>