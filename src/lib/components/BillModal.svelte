<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Fa } from 'svelte-fa';
  import { faTimes } from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  export let show = false;
  export let products: Array<{ name: string; quantity: number; price: number }> = [];

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }

  $: totalPrice = products.reduce((sum, product) => sum + product.quantity * product.price, 0);
</script>

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out" transition:slide={{duration: 300, easing: quintOut}}>
      <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Bill Details</h2>
        <button
          on:click={closeModal}
          class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
        >
          <Fa icon={faTimes} />
        </button>
      </div>
        {#if products.length > 0}
      <div class="p-6 max-h-[70vh] overflow-y-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="text-left py-2 text-gray-600 dark:text-gray-400">Item</th>
              <th class="text-right py-2 text-gray-600 dark:text-gray-400">Quantity</th>
              <th class="text-right py-2 text-gray-600 dark:text-gray-400">Price</th>
              <th class="text-right py-2 text-gray-600 dark:text-gray-400">Total</th>
            </tr>
          </thead>
          <tbody>
            {#each products as product}
              <tr class="border-b dark:border-gray-700">
                <td class="py-2 text-gray-900 dark:text-white">{product.name}</td>
                <td class="py-2 text-right text-gray-900 dark:text-white">{product.quantity}</td>
                <td class="py-2 text-right text-gray-900 dark:text-white">${product.price.toFixed(2)}</td>
                <td class="py-2 text-right text-gray-900 dark:text-white">${(product.quantity * product.price).toFixed(2)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
        
      </div>
      <div class="p-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <h1><span class="text-xl font-bold text-gray-900 dark:text-white">Total:</span></h1>
          <h1><span class="text-xl font-bold text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span></h1>
        </div>
      </div>
      {:else}
      <div class="p-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <p class="text-gray-900 dark:text-white">Bill is empty.</p>
        </div>
      </div>
        {/if}
    </div>
    
  </div>
{/if}