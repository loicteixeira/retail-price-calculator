<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-dvh bg-white text-black">
	<Header />

	{@render children()}
</div>
