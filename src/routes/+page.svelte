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
		<div class="overflow-x-auto rounded border border-gray-300">
			<table class="table-auto border-inherit">
				<thead
					class="text-md border-inherit bg-gray-100 text-center align-text-top uppercase tracking-wide text-gray-700"
				>
					<tr class="border-inherit">
						{#each results.columns as column}
							<th
								class="border-inherit px-4 py-3 [&:not(:last-child)]:border-e"
								colspan={column.children ? column.children.length : 1}
							>
								{column.label}
							</th>
						{/each}
					</tr>
					<tr class="border-inherit">
						{#each results.columns as column}
							{#if column.children}
								{#each column.children as child}
									<th class="border border-inherit px-4 py-3">{child}</th>
								{/each}
							{:else}
								<th class="border-b border-inherit px-4 py-3 [&:not(:last-child)]:border-e"
									>&nbsp;</th
								>
							{/if}
						{/each}
					</tr>
				</thead>
				<tbody class="border-inherit">
					{#each results.groups as group}
						<tr class="border-b border-inherit">
							<td
								class="border-inherit px-4 py-3 [&:not(:last-child)]:border-e"
								rowspan={group.rows.length}
							>
								{group.label}
							</td>
							{#each group.rows[0] as cell}
								<td class="border-inherit px-4 py-3 [&:not(:last-child)]:border-e">{cell}</td>
							{/each}
						</tr>
						{#each group.rows.slice(1) as cells}
							<tr class="border-inherit [&:not(:last-child)]:border-b">
								{#each cells as cell}
									<td class="border-inherit px-4 py-3 [&:not(:last-child)]:border-e">{cell}</td>
								{/each}
							</tr>
						{/each}
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
