<!-- AddItemForm.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Fa } from 'svelte-fa';
  import { faCheck, faFileInvoice, faPlus, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';

  export let people: Array<{ id: string; name: string }>;

  let itemName = '';
  let itemPrice = 0;
  let itemQuantity = 1;
  let selectedPeople: string[] = [];
  let showModal = false;

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    if (itemName && itemPrice > 0 && itemQuantity > 0 && selectedPeople.length > 0) {
      const newItem = {
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
        assignedTo: selectedPeople
      };
      dispatch('addItem', newItem);
      resetForm();
    }
  }

  function resetForm() {
    itemName = '';
    itemPrice = 0;
    itemQuantity = 1;
    selectedPeople = [];
  }

  function toggleModal() {
    showModal = !showModal;
  }

  function handleAssign() {
    toggleModal();
  }

  function handleCheckboxChange(event: Event, personId: string) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      selectedPeople = [...selectedPeople, personId];
    } else {
      selectedPeople = selectedPeople.filter(id => id !== personId);
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 transition-colors duration-300">
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">New Item</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="space-y-2">
        <label for="itemName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
        <input
          type="text"
          id="itemName"
          bind:value={itemName}
          required
          class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all duration-200"
        />
      </div>
      <div class="space-y-2">
        <label for="itemPrice" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
        <input
          type="number"
          id="itemPrice"
          bind:value={itemPrice}
          min="0"
          step="0.01"
          required
          class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all duration-200"
        />
      </div>
      <div class="space-y-2">
        <label for="itemQuantity" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
        <input
          type="number"
          id="itemQuantity"
          bind:value={itemQuantity}
          min="1"
          required
          class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all duration-200"
        />
      </div>
      <div class="space-y-2 flex justify-end items-end">
        <button
          type="button"
          on:click={toggleModal}
          class="bg-secondary-light dark:bg-secondary-dark text-white font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-all duration-200 flex items-center justify-center w-full"
        >
          <Fa icon={faUserPlus} class="mr-2" />
          Assign to ({selectedPeople.length})
        </button>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row justify-end mt-4 gap-2">
      <button
        type="submit"
        class="bg-primary-light dark:bg-primary-dark text-white font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-all duration-200 flex items-center justify-center"
      >
        <Fa icon={faPlus} class="mr-2" />
        Add Item
      </button>
    </div>
  </form>
</div>

{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" transition:fade={{ duration: 200 }}>
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md m-4" transition:slide={{duration: 300, easing: quintOut}}>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-gray-800 dark:text-white">Assign to:</h3>
        <button on:click={toggleModal} class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
          <Fa icon={faTimes} />
        </button>
      </div>
      <div class="space-y-2 max-h-60 overflow-y-auto">
        {#each people as person (person.id)}
          <label 
            class="inline-flex items-center rounded-full px-3 py-1.5 m-1 text-sm font-medium cursor-pointer transition-all duration-200 select-none"
            class:bg-gray-100={!selectedPeople.includes(person.id)}
            class:text-gray-600={!selectedPeople.includes(person.id)}
            class:dark:bg-gray-700={!selectedPeople.includes(person.id)}
            class:dark:text-gray-300={!selectedPeople.includes(person.id)}
            class:bg-primary-light={selectedPeople.includes(person.id)}
            class:dark:bg-primary-dark={selectedPeople.includes(person.id)}
            class:text-white={selectedPeople.includes(person.id)}
            class:ring-2={selectedPeople.includes(person.id)}
            class:ring-primary-light={selectedPeople.includes(person.id)}
            class:dark:ring-primary-dark={selectedPeople.includes(person.id)}
          >
            <input
              type="checkbox"
              value={person.id}
              checked={selectedPeople.includes(person.id)}
              on:change={(event) => handleCheckboxChange(event, person.id)}
              class="sr-only"
            />
            <span class="mr-1.5">
              {#if selectedPeople.includes(person.id)}
                <Fa icon={faCheck} class="text-xs" />
              {:else}
                <Fa icon={faPlus} class="text-xs" />
              {/if}
            </span>
            {person.name}
          </label>
        {/each}
      </div>
      <div class="mt-4 flex justify-end">
        <button
          on:click={handleAssign}
          class="bg-primary-light dark:bg-primary-dark text-white font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-all duration-200"
        >
          Assign
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Add any custom styles here if needed */
</style>