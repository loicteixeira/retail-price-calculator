<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/Form';
	import { CURRENCY_SYMBOL, DEMO_DATA } from '$lib/demo';
	import type { Fee, FormState } from '$lib/types';

	const startingData = dev
		? structuredClone(DEMO_DATA)
		: {
				bundles: [],
				currencySymbol: CURRENCY_SYMBOL,
				fees: [],
				orderCount: null,
				scenarios: [],
				unitCost: null
			};
	let form = $state<FormState>(startingData);

	function calculateFees(value: number, fees: Fee[]) {
		const details = fees.map((fee) => {
			switch (fee.type) {
				case 'flat':
					return fee.amount;
				case 'percent':
					return (value * fee.amount) / 100;
			}
		});
		const total = details.reduce((a, b) => a + b, 0);
		return { details, total };
	}

	let results = $derived.by(() => {
		const firstValidScenario = form.scenarios && form.scenarios.find((v) => !isNaN(v));
		const baseListingPrice = firstValidScenario ? firstValidScenario : (form.unitCost || 0) * 3;
		const baseFees = calculateFees(baseListingPrice, form.fees);
		const baseResult = { name: 'Single', listingPrice: baseListingPrice, fees: baseFees };

		return form.bundles.reduce<
			{ name: string; listingPrice: number; fees: { details: number[]; total: number } }[]
		>(
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

<div class="mx-auto mb-8 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
	<form class="flex flex-col gap-6" novalidate>
		<div class="flex flex-row flex-wrap gap-6">
			<Form.ProductInfoFieldSet
				currencySymbol={form.currencySymbol}
				bind:orderCount={form.orderCount}
				bind:unitCost={form.unitCost}
			/>

			<Form.ScenariosFieldSet
				currencySymbol={form.currencySymbol}
				bind:scenarios={form.scenarios}
			/>

			<span class="grow">&nbsp</span>

			<Form.SettingsFieldSet bind:currencySymbol={form.currencySymbol} />
		</div>

		<div class="flex flex-row flex-wrap gap-6">
			<Form.BundleOptionsFieldSet bind:bundles={form.bundles} />
			<Form.FeesFieldSet currencySymbol={form.currencySymbol} bind:fees={form.fees} />
		</div>
	</form>

	<span class="my-8 flex items-center">
		<span class="h-px flex-1 bg-gray-300"></span>
		<span class="shrink-0 px-6">Results</span>
		<span class="h-px flex-1 bg-gray-300"></span>
	</span>

	<table class="mr-auto table-fixed">
		<thead>
			<tr class="text-left align-text-top uppercase text-gray-700">
				<th class="px-2" rowspan="2">Name</th>
				<th class="px-2" rowspan="2">Listing Price</th>
				<th class="px-2 text-center" colspan={form.fees.length + 1}>Fees</th>
			</tr>
			<tr class="text-left align-text-top uppercase text-gray-700">
				{#each form.fees as { name, key } (key)}
					<th class="px-2">{name}</th>
				{/each}
				<th class="px-2">Total</th>
			</tr>
		</thead>
		<tbody>
			{#each results as result}
				<!-- TODO: Proper currency formatting -->
				<tr>
					<td class="px-2 py-1.5">{result.name}</td>
					<td class="px-2 py-1.5 text-right">
						{form.currencySymbol}{result.listingPrice.toFixed(2)}
					</td>
					{#each result.fees.details as fee}
						<td class="px-2 py-1.5 text-right">
							{form.currencySymbol}{fee.toFixed(2)}
						</td>
					{/each}
					<td class="px-2 py-1.5 text-right">
						{form.currencySymbol}{result.fees.total.toFixed(2)}
					</td>
					<!-- TODO: Item Cost -->
					<!-- TODO: Net -->
					<!-- TODO: Margin -->
					<!-- TODO: Break even quantity -->
				</tr>
			{/each}
		</tbody>
	</table>
</div>
