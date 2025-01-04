<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Required<Pick<HTMLInputAttributes, 'id'>> & HTMLInputAttributes;

	let { class: extraClass, id, type = 'text', value = $bindable(), ...attrs }: Props = $props();
</script>

<input
	class="mt-1 block rounded border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-300 focus:ring-opacity-50 {extraClass}"
	{id}
	{type}
	{...attrs}
	bind:value
/>
