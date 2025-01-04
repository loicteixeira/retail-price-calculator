<script lang="ts">
	import { dev } from '$app/environment';
	import * as CalculatorForm from '$lib/components/CalculatorForm';
	import { CURRENCY_SYMBOL, DEMO_DATA } from '$lib/demo';
	import type { CalculatorForm as CalculatorFormType } from '$lib/types';

	const startingData = dev
		? structuredClone(DEMO_DATA)
		: { unitCost: null, orderCount: null, currencySymbol: CURRENCY_SYMBOL, bundles: [], fees: [] };
	let form = $state<CalculatorFormType>(startingData);
</script>

<div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
	<form class="flex flex-row flex-wrap gap-6" novalidate>
		<div class="flex grow flex-col gap-6">
			<CalculatorForm.ProductInfoFieldSet
				currencySymbol={form.currencySymbol}
				bind:orderCount={form.orderCount}
				bind:unitCost={form.unitCost}
			/>

			<CalculatorForm.SettingsFieldSet bind:currencySymbol={form.currencySymbol} />
		</div>

		<CalculatorForm.BundleOptionsFieldSet bind:bundles={form.bundles} />
		<CalculatorForm.FeesFieldSet currencySymbol={form.currencySymbol} bind:fees={form.fees} />
	</form>
</div>
