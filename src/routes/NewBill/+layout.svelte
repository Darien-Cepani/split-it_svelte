<script lang="ts">
  import '../../app.css';
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import GradientBackground from '$lib/components/GradientBackground.svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  let darkMode = false;

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    darkMode = savedTheme === 'dark';
    updateTheme();
  });

  function toggleDarkMode(): void {
    darkMode = !darkMode;
    updateTheme();
  }

  function updateTheme(): void {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
</script>

<div class="relative min-h-screen p-5" transition:slide={{duration: 300, easing: quintOut}}>
  <GradientBackground />
  <div class="relative z-10">
    <Navbar {darkMode} {toggleDarkMode} />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</div>