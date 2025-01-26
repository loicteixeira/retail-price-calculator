<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { children: Snippet; id: string; level: 1 | 2 | 3 };
	let { children, id: id, level }: Props = $props();
</script>

<svelte:element this={`h${level}`} {id}>
	<a
		href="#{id}"
		class="relative no-underline hover:before:absolute hover:before:-left-[.75em] hover:before:text-base hover:before:text-gray-600 hover:before:content-['¶']"
	>
		{@render children()}
	</a>
</svelte:element>
