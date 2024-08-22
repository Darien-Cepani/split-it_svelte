<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Fa } from 'svelte-fa';
  import { faTimes } from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  export let person: {
    id: string;
    name: string;
    amountToBePaid: number;
    amountPaid: number;
  };
  export let show = false;

  const dispatch = createEventDispatcher();

  let paymentAmount = 0;

  function handleSubmit() {
    if (paymentAmount > 0) {
      dispatch('addPayment', { personId: person.id, amount: paymentAmount });
      paymentAmount = 0;
      closeModal();
    }
  }

  function closeModal() {
    dispatch('close');
  }
</script>

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md" transition:slide={{duration: 300, easing: quintOut}}>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Add Payment for {person.name}</h2>
        <button on:click={closeModal} class="text-gray-500 hover:text-gray-700">
          <Fa icon={faTimes} />
        </button>
      </div>
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
          <label for="paymentAmount" class="block mb-1">Payment Amount</label>
          <input
            type="number"
            id="paymentAmount"
            bind:value={paymentAmount}
            min="0"
            step="0.01"
            required
            class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div class="flex justify-between">
          <p>Amount to be paid: ${person.amountToBePaid.toFixed(2)}</p>
          <p>Amount paid: ${person.amountPaid.toFixed(2)}</p>
        </div>
        <button
          type="submit"
          class="bg-primary-light dark:bg-primary-dark text-white font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-all duration-200 w-full"
        >
          Add Payment
        </button>
      </form>
    </div>
  </div>
{/if}