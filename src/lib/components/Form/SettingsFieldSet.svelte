<script lang="ts">
	import { CURRENCY_CODES } from '$lib/currencies';
	import type { FormState } from '$lib/types';
	import FieldSet from '../Atoms/FieldSet.svelte';

	type Props = Pick<FormState, 'currencyCode'>;
	let { currencyCode = $bindable() }: Props = $props();
</script>

<FieldSet class="flex flex-col gap-4" title="Settings">
	<label class="block">
		Currency
		<select
			class="mt-1 block w-32 rounded border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
			id="currency-code"
			bind:value={currencyCode}
		>
			{#each CURRENCY_CODES as currency}
				<option value={currency}>{currency}</option>
			{/each}
		</select>
	</label>
</FieldSet>
