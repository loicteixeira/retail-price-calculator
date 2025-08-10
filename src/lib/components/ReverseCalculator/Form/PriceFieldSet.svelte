<script lang="ts">
	import type { ReverseFormState } from '$lib/types';
	import FieldSet from '../../Atoms/FieldSet.svelte';
	import Input from '../../Atoms/Input.svelte';

	type Props = Pick<ReverseFormState, 'salePrice'> & { currencySymbol: string };
	let { currencySymbol, salePrice = $bindable() }: Props = $props();
</script>

<FieldSet class="flex flex-row flex-wrap gap-4" title="Product Information">
	<label class="block">
		Sale Price
		<Input
			class="w-32"
			icon={currencySymbol}
			id="unit-cost"
			min="0"
			step="1"
			type="number"
			bind:value={salePrice}
		/>
	</label>
</FieldSet>
