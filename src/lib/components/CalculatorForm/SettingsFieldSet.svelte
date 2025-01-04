<script lang="ts">
	import type { CalculatorForm } from '$lib/types';
	import FieldSet from '../FieldSet.svelte';
	import Input from '../Input.svelte';

	type Props = Pick<CalculatorForm, 'currencySymbol'>;
	let { currencySymbol = $bindable() }: Props = $props();
</script>

<FieldSet class="flex flex-col gap-4" title="Settings">
	<label class="block">
		Currency Symbol
		<Input class="w-full" id="currency-symbol" type="text" bind:value={currencySymbol} />
	</label>
</FieldSet>
