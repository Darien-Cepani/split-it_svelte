<script lang="ts">
  import PersonCard from './PersonCard.svelte';
  import AddItemForm from './AddItemForm.svelte';
  import BillModal from './BillModal.svelte';
  import { Fa } from 'svelte-fa';
  import { faFileInvoice, faPlus } from '@fortawesome/free-solid-svg-icons';

  let people = [
    {
      id: '1',
      name: 'John Doe',
      items: [
        { id: '1', name: 'Pizza', quantity: 2, price: 15 },
        { id: '2', name: 'Soda', quantity: 2, price: 2.5 },
      ],
      payments: [30],
    },
    // Add more sample data as needed
  ];

  let showBillModal = false;

  function handleUpdate(event: { detail: any; }) {
    const updatedPerson = event.detail;
    people = people.map(p => p.id === updatedPerson.id ? updatedPerson : p);
  }

  function handleDelete(event: { detail: any; }) {
    const personId = event.detail;
    people = people.filter(p => p.id !== personId);
  }

  function handleAddPayment(event: { detail: { personId: any; amount: any; }; }) {
    const { personId, amount } = event.detail;
    people = people.map(person => {
      if (person.id === personId) {
        return {
          ...person,
          payments: [...person.payments, amount]
        };
      }
      return person;
    });
  }

  function addNewPerson() {
    const newPerson = {
      id: Date.now().toString(),
      name: 'New Person',
      items: [],
      payments: [],
    };
    people = [...people, newPerson];
  }

  function handleAddItem(event: { detail: any; }) {
    const newItem = event.detail;
    const itemId = Date.now().toString();

    people = people.map(person => {
      if (newItem.assignedTo.includes(person.id)) {
        return {
          ...person,
          items: [...person.items, {
            id: itemId,
            name: newItem.name,
            quantity: newItem.quantity / newItem.assignedTo.length,
            price: newItem.price,
          }]
        };
      }
      return person;
    });
  }

  function toggleBillModal() {
    showBillModal = !showBillModal;
  }

  $: products = people.flatMap(person => person.items);
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row gap-4">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Bill Manager</h1>
    <button
      type="button"
      on:click={toggleBillModal}
      class="bg-primary-light dark:bg-primary-dark text-white font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
    >
      <Fa icon={faFileInvoice} class="mr-2" />
      Show Bill
    </button>
    </div>
    <AddItemForm {people} on:addItem={handleAddItem} />
  </div>

  <div class="flex flex-col gap-4 mt-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Person Manager</h1>
      <button
        on:click={addNewPerson}
        class="bg-primary-light dark:bg-primary-dark text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-opacity-80 transition-all duration-200 flex items-center mb-6"
      >
        <Fa icon={faPlus} class="mr-2" />
        Add New Person
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each people as person (person.id)}
      <PersonCard
        {person}
        on:update={handleUpdate}
        on:delete={handleDelete}
        on:addPayment={handleAddPayment}
      />
    {/each}
  </div>
  </div>
  
  <BillModal {products} show={showBillModal} on:close={toggleBillModal} />
</div>