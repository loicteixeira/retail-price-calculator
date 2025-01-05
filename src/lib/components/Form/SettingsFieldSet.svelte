<script lang="ts">
	import type { FormState } from '$lib/types';
	import FieldSet from '../FieldSet.svelte';
	import Input from '../Input.svelte';

	type Props = Pick<FormState, 'currencySymbol'>;
	let { currencySymbol = $bindable() }: Props = $props();
</script>

<FieldSet class="flex flex-col gap-4" title="Settings">
	<label class="block">
		Currency Symbol
		<Input class="w-32" id="currency-symbol" type="text" bind:value={currencySymbol} />
	</label>
</FieldSet>
