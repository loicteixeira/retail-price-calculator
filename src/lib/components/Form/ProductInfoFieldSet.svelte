<script lang="ts">
	import type { FormState } from '$lib/types';
	import FieldSet from '../FieldSet.svelte';
	import Input from '../Input.svelte';

	type Props = Pick<FormState, 'currencySymbol' | 'orderCount' | 'unitCost'>;
	let { currencySymbol, orderCount = $bindable(), unitCost = $bindable() }: Props = $props();
</script>

<FieldSet class="flex flex-row flex-wrap gap-4" title="Product Information">
	<label class="block">
		Unit Cost ({currencySymbol})
		<Input class="w-32" id="unit-cost" min="0" step="1" type="number" bind:value={unitCost} />
	</label>

	<label class="block">
		Order Count
		<Input class="w-32" id="order-count" min="0" step="1" type="number" bind:value={orderCount} />
	</label>
</FieldSet>
