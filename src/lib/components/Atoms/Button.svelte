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

<button
	class="rounded px-2 py-1 {colors[variant]}
	focus-visible:outline focus-visible:outline-teal-600 focus-visible:ring focus-visible:ring-teal-300 focus-visible:ring-opacity-50
	 {extraClass}"
	{type}
	{...attrs}
>
	{@render children()}
</button>
