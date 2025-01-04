<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = { children: Snippet; variant?: 'primary' | 'secondary' } & HTMLButtonAttributes;
	let { children, class: _, variant = 'secondary', ...attrs }: Props = $props();

	let colors =
		variant === 'primary'
			? 'text-teal-600 hover:bg-teal-600/10 active:bg-teal-600/20'
			: 'text-gray-600 hover:bg-gray-600/10 active:bg-gray-600/20';
</script>

<button class="px-2 py-1 hover:rounded {colors}" {...attrs}>
	{@render children()}
</button>
