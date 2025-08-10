<script lang="ts">
	import { browser } from '$app/environment';
</script>

<svelte:head>
	<title>Reverse – Price Calculator</title>
	<meta
		name="description"
		content="This reverse calculator is a tool designed to help you understand how much money you have left after deducting various fees."
	/>
</svelte:head>

{#if browser}
	<div class="mx-auto mb-8 max-w-screen-2xl px-4 sm:px-6 lg:px-8">Reverse</div>
{/if}
