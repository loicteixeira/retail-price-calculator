<script lang="ts">
	import type { FormState } from '$lib/types';
	import FieldSet from '../FieldSet.svelte';
	import Input from '../Input.svelte';

	type Props = Pick<FormState, 'currencySymbol' | 'scenarios'>;
	let { currencySymbol, scenarios = $bindable() }: Props = $props();
</script>

<FieldSet title="Scenarios">
	<span class="block">Single listing prices, comma-separated ({currencySymbol})</span>
	<Input
		class="inline w-full"
		id="scenarios"
		type="text"
		bind:value={() => scenarios.join(','),
		(value) => (scenarios = value.split(',').map((v) => parseFloat(v)))}
	/>
</FieldSet>
