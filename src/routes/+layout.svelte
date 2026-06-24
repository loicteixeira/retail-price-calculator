<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="bg-yellow-400 px-4 py-3 text-center text-sm font-medium text-black">
	This tool is now available at <a
		href="https://retail-calculators.minies.perfectdodge.com"
		class="font-bold underline">https://retail-calculators.minies.perfectdodge.com</a
	> — please update your bookmark as this version will be taken down.
</div>

<div class="min-h-dvh bg-white text-black">
	<Header />

	{@render children()}
</div>
