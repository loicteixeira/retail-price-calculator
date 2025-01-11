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
</script>

<div
	class={[
		'mt-1 flex rounded border border-gray-300',
		'has-[:focus-within]:border has-[:focus-within]:border-teal-700 has-[:focus-within]:ring has-[:focus-within]:ring-teal-300 has-[:focus-within]:ring-opacity-50',
		extraClass
	]}
>
	<input
		class={['w-full border-none focus:ring-0', icon ? 'rounded-s border-e-0' : 'rounded']}
		{id}
		{type}
		{...attrs}
		bind:value
	/>
	{#if icon}
		<span class="inline-flex items-center rounded-e bg-gray-100 px-3 text-sm">
			{icon}
		</span>
	{/if}
</div>
