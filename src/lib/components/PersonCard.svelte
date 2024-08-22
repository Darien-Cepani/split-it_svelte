<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { createEventDispatcher } from 'svelte';
  import PaymentModal from './PaymentModal.svelte';
  import { faPencil, faTrash, faCheck, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  export let person: {
    id: string;
    name: string;
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
    payments: number[];
  };

  $: amountToBePaid = person.items.reduce((total, item) => total + item.quantity * item.price, 0);
  $: amountPaid = person.payments.reduce((total, payment) => total + payment, 0);
  $: difference = amountToBePaid - amountPaid;

  $: badgeStatus = (() => {
    if (amountToBePaid === 0) return "Hasn't ordered";
    if (difference > 0) return `Owes $${difference.toFixed(2)}`;
    if (difference < 0) return `Is owed $${Math.abs(difference).toFixed(2)}`;
    return "Settled";
  })();

  const dispatch = createEventDispatcher();

  let showPaymentModal = false;

  function editPerson() {
    dispatch('edit', person.id);
  }

  function deletePerson() {
    dispatch('delete', person.id);
  }

  function openPaymentModal() {
    showPaymentModal = true;
  }

  function closePaymentModal() {
    showPaymentModal = false;
  }

  function handleAddPayment(event: CustomEvent<any>) {
    dispatch('addPayment', event.detail);
    closePaymentModal();
  }

  let originalStatus: string;
  function setSettled() {
    if (badgeStatus === "Settled") {
      badgeStatus = originalStatus;
    } else {
      originalStatus = badgeStatus;
      badgeStatus = "Settled";
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-4 transition-all duration-300 hover:shadow-xl" transition:slide={{duration: 300, easing: quintOut}}>
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{person.name}</h2>
    <div class="space-x-2">
      <button on:click={editPerson} class="text-blue-500 hover:text-blue-600 transition-colors duration-200">
        <Fa icon={faPencil} />
      </button>
      <button on:click={deletePerson} class="text-red-500 hover:text-red-600 transition-colors duration-200">
        <Fa icon={faTrash} />
      </button>
    </div>
  </div>

  <h3 class="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Items</h3>
  <ul class="space-y-2 mb-4 max-h-60 overflow-y-auto">
    {#each person.items as item (item.id)}
      <li class="flex justify-between items-center text-gray-600 dark:text-gray-400" transition:slide={{duration: 200, easing: quintOut}}>
        <span>{item.name} (x{item.quantity.toFixed(2)})</span>
        <span>${(item.quantity * item.price).toFixed(2)}</span>
      </li>
    {/each}
  </ul>

  <div class="mt-auto">
    <div class="mb-4 flex flex-col sm:flex-row items-center justify-between w-full py-2 px-4 rounded-md text-sm" 
         class:bg-green-500={badgeStatus === "Settled"}
         class:bg-gray-500={badgeStatus === "Hasn't ordered"}
         class:bg-red-500={badgeStatus !== "Settled" && badgeStatus !== "Hasn't ordered"}
         transition:fade={{duration: 300}}>
      <p class="text-white mb-2 sm:mb-0">Ordered: ${amountToBePaid.toFixed(2)}</p>
      <p class="text-white mb-2 sm:mb-0">Paid: ${amountPaid.toFixed(2)}</p>
      <span class="flex items-center gap-2 text-white font-semibold">
        {#if badgeStatus === "Settled"}
          <Fa icon={faCheck} />
        {/if}
        {badgeStatus}
      </span>
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:gap-2">
      <button
        on:click={openPaymentModal}
        class="sm:flex-1 w-full flex flex-row items-center justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <Fa icon={faMoneyBillWave} class="mr-2" />
        Add Payment
      </button>
      <button
        on:click={setSettled}
        class="sm:flex-1 w-full flex flex-row items-center justify-center bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        <Fa icon={faCheck} class="mr-2" />
        Set Settled
      </button>
    </div>
  </div>

  <PaymentModal
    person={{...person, amountToBePaid, amountPaid}}
    show={showPaymentModal}
    on:close={closePaymentModal}
    on:addPayment={handleAddPayment}
  />
</div>