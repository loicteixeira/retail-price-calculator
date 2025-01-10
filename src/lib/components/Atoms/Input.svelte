<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Required<Pick<HTMLInputAttributes, 'id'>> & HTMLInputAttributes & { icon?: string };

	let {
		class: extraClass,
		icon,
		id,
		type = 'text',
		value = $bindable(),
		...attrs
	}: Props = $props();

	const inputRoundedClass = icon ? 'rounded-s border-e-0' : 'rounded';
</script>

<div
	class="mt-1 flex rounded has-[:focus-within]:border-teal-600 has-[:focus-within]:ring has-[:focus-within]:ring-teal-300 has-[:focus-within]:ring-opacity-50 {extraClass}"
>
	<input
		class="border border-gray-300 focus:border-gray-300 focus:ring-0 {inputRoundedClass} w-full"
		{id}
		{type}
		{...attrs}
		bind:value
	/>
	{#if icon}
		<span
			class="inline-flex items-center rounded-e border border-s-0 border-gray-300 bg-gray-100 px-3 text-sm"
		>
			{icon}
		</span>
	{/if}
</div>
