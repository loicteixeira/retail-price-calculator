<script lang="ts">
	import * as Form from '$lib/components/Form';
	import { computeResults } from '$lib/compute';
	import data from '$lib/data';
	import { getCurrencySymbol } from '$lib/i18n';
	import type { FormState } from '$lib/types';

	const startingData = structuredClone(data.demo);
	let form = $state<FormState>(startingData);

	let currencySymbol = $derived(getCurrencySymbol(form.currencyCode));

	let results = $derived.by(() => {
		return computeResults({
			currencyCode: form.currencyCode,
			fees: form.fees,
			salesOptions: [
				{
					buyCount: 1,
					freeCount: 0,
					name: 'Single',
					rounding: null
				},
				...form.bundles
			],
			productInformation: { orderCount: form.orderCount || 0, unitCost: form.unitCost || 0 },
			scenarios: form.scenarios
		});
	});

	function onClearData() {
		form = structuredClone(data.empty);
	}

	function onLoadDemoData() {
		form = structuredClone(data.demo);
	}
</script>

<div class="mx-auto mb-8 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
	<form class="my-8 flex flex-col gap-6" novalidate>
		<div class="flex flex-row flex-wrap justify-between gap-6">
			<Form.ProductInfoFieldSet
				{currencySymbol}
				bind:orderCount={form.orderCount}
				bind:unitCost={form.unitCost}
			/>

			<div class="space-between flex flex-row flex-wrap gap-6">
				<Form.SettingsFieldSet bind:currencyCode={form.currencyCode} />
				<Form.ActionsFieldSet {onClearData} {onLoadDemoData} />
			</div>
		</div>

		<div class="grid-warp grid grid-cols-[repeat(auto-fit,_minmax(150px,auto))] gap-6">
			<Form.ScenariosFieldSet
				class="col-span-2"
				currencyCode={form.currencyCode}
				{currencySymbol}
				unitCost={form.unitCost}
				bind:scenarios={form.scenarios}
			/>
			<Form.BundleOptionsFieldSet class="col-span-3" bind:bundles={form.bundles} />
			<Form.FeesFieldSet class="col-span-3" {currencySymbol} bind:fees={form.fees} />
		</div>
	</form>

	{#if results}
		<table class="table-auto">
			<thead class="uppercase text-gray-700">
				<tr class="text-left align-text-top">
					{#each results.columns as column}
						<th
							class="px-2 {column.children && 'text-center'}"
							rowspan={column.children ? 1 : 2}
							colspan={column.children ? column.children.length : 1}
						>
							{column.label}
						</th>
					{/each}
				</tr>
				<tr class="text-left align-text-top">
					{#each results.columns as column}
						{#if column.children}
							{#each column.children as child}
								<th class="px-2">{child}</th>
							{/each}
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each results.groups as group, index}
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
	{/if}
</div>
