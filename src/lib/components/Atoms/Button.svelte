<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		variant?: 'primary' | 'secondary' | 'danger';
	} & HTMLButtonAttributes;
	let {
		children,
		class: extraClass,
		type = 'button',
		variant = 'secondary',
		...attrs
	}: Props = $props();

	const colors = {
		primary: 'text-teal-600 hover:bg-teal-600/10 active:bg-teal-600/20',
		secondary: 'text-glack hover:bg-gray-600/10 active:bg-gray-600/20',
		danger: 'text-red-600 hover:bg-red-600/10 active:bg-red-600/20'
	};
</script>

<button class="px-2 py-1 hover:rounded {colors[variant]} {extraClass}" {type} {...attrs}>
	{@render children()}
</button>
