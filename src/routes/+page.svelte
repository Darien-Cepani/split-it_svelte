<script lang="ts">
  import { Fa } from 'svelte-fa';
  import { faPlus } from '@fortawesome/free-solid-svg-icons';
  import { goto } from '$app/navigation';

  function startNewBill() {
    goto('/NewBill');
  }
</script>

<svelte:head>
  <title>SplitIt - Easy Bill Splitting</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen text-center">
  <h1 class="text-4xl font-bold mb-4">Welcome to SplitIt</h1>
  <p class="text-xl mb-8">The easiest way to split bills with friends and family</p>
  
  <button
    on:click={startNewBill}
    class="bg-primary-light dark:bg-primary-dark text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-200 flex items-center"
  >
    <Fa icon={faPlus} class="mr-2" />
    Start New Bill
  </button>
</div>