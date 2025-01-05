<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/Form';
	import { computeResults } from '$lib/compute';
	import { CURRENCY_SYMBOL, DEMO_DATA } from '$lib/demo';
	import type { FormState } from '$lib/types';

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

	let { columns, groups } = $derived.by(() => {
		return computeResults({
			fees: form.fees,
			salesOptions: [
				{
					buyCount: 1,
					freeCount: 0,
					name: 'Single',
					rounding: null
				},
				...form.bundles.map((bundle) => ({
					buyCount: bundle.buy,
					freeCount: bundle.free,
					name: bundle.name,
					rounding: bundle.round
				}))
			],
			productInformation: { orderCount: form.orderCount || 0, unitCost: form.unitCost || 0 },
			scenarios: form.scenarios
		});
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
				{#each columns as column}
					<th
						class="px-2 {'children' in column && 'text-center'}"
						rowspan={'children' in column ? 1 : 2}
						colspan={'children' in column ? column.children.length : 1}
					>
						{column.label}
					</th>
				{/each}
			</tr>
			<tr class="text-left align-text-top uppercase text-gray-700">
				{#each columns as column}
					{#if 'children' in column}
						{#each column.children as child}
							<th class="px-2">{child}</th>
						{/each}
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each groups as group, index}
				<tr class={index !== 0 ? 'border-t-2' : ''}>
					<td class="px-2 py-1.5" rowspan={group.rows.length}>{group.label}</td>
					{#each group.rows[0] as cell}
						<td class="px-2 py-1.5">{cell}</td>
					{/each}
				</tr>
				{#each group.rows.slice(1) as cells}
					<tr>
						{#each cells as cell}
							<td class="px-2 py-1.5">{cell}</td>
						{/each}
					</tr>
				{/each}
			{/each}
		</tbody>
	</table>
</div>
