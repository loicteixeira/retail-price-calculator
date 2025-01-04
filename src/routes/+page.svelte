<script lang="ts">
	import { dev } from '$app/environment';
	import * as CalculatorForm from '$lib/components/CalculatorForm';
	import { CURRENCY_SYMBOL, DEMO_DATA } from '$lib/demo';
	import type { CalculatorForm as CalculatorFormType, Fee } from '$lib/types';

	const startingData = dev
		? structuredClone(DEMO_DATA)
		: { unitCost: null, orderCount: null, currencySymbol: CURRENCY_SYMBOL, bundles: [], fees: [] };
	let form = $state<CalculatorFormType>(startingData);

	function calculateFees(value: number, fees: Fee[]) {
		return fees.reduce<number>((acc, fee) => {
			let feeAmount = 0;
			switch (fee.type) {
				case 'flat':
					feeAmount = fee.amount;
					break;
				case 'percent':
					feeAmount = (value * fee.amount) / 100;
					break;
			}
			return acc + feeAmount;
		}, 0);
	}

	let results = $derived.by(() => {
		const baseListingPrice = (form.unitCost || 0) * 3;
		const baseFees = calculateFees(baseListingPrice, form.fees);
		const baseResult = { name: 'Base', listingPrice: baseListingPrice, fees: baseFees };

		return form.bundles.reduce<{ name: string; listingPrice: number; fees: number }[]>(
			(acc, value) => {
				let listingPrice = baseListingPrice * value.buy;
				if (value.round) {
					listingPrice = Math.floor(listingPrice / value.round) * value.round;
				}

				const fees = calculateFees(listingPrice, form.fees);

				acc.push({ name: value.name, listingPrice, fees });
				return acc;
			},
			[baseResult]
		);
	});
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

	<span class="my-8 flex items-center">
		<span class="h-px flex-1 bg-gray-300"></span>
		<span class="shrink-0 px-6">Results</span>
		<span class="h-px flex-1 bg-gray-300"></span>
	</span>

	<table class="mr-auto table-fixed">
		<thead>
			<tr class="text-left align-text-top uppercase text-gray-700">
				<th class="px-2">Name</th>
				<th class="px-2">Listing Price</th>
				<th class="px-2">Fees</th>
			</tr>
		</thead>
		<tbody>
			{#each results as result}
				<tr>
					<td class="px-2 py-1.5">{result.name}</td>
					<td class="px-2 py-1.5 text-right">
						<!-- TODO: Proper currency formatting -->
						{form.currencySymbol}{result.listingPrice.toFixed(2)}
					</td>
					<td class="px-2 py-1.5 text-right">
						<!-- TODO: Proper currency formatting -->
						{form.currencySymbol}{result.fees.toFixed(2)}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
