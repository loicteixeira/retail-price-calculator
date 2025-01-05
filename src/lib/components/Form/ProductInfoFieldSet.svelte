<script lang="ts">
	import type { FormState } from '$lib/types';
	import FieldSet from '../FieldSet.svelte';
	import Input from '../Input.svelte';

	type Props = Pick<FormState, 'currencySymbol' | 'orderCount' | 'unitCost'>;
	let { currencySymbol, orderCount = $bindable(), unitCost = $bindable() }: Props = $props();
</script>

<FieldSet class="flex flex-col gap-4" title="Product Information">
	<label class="block">
		Unit Cost
		<div class="relative">
			<Input class="w-full" id="unit-cost" min="0" step="1" type="number" bind:value={unitCost} />
			<span class="absolute inset-y-0 end-0 grid place-content-center px-4">
				{currencySymbol}
			</span>
		</div>
	</label>

	<label class="block">
		Order Count
		<Input class="w-full" id="order-count" min="0" step="1" type="number" bind:value={orderCount} />
	</label>
</FieldSet>
