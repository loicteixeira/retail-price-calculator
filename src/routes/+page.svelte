<script lang="ts">
	import * as Form from '$lib/components/Form';
	import ResultsTable from '$lib/components/Results/ResultsTable.svelte';
	import { computeResults } from '$lib/compute';
	import { downloadAsCSV } from '$lib/export';
	import { getCurrencySymbol } from '$lib/i18n';

	const form = Form.useState();

	let currencySymbol = $derived(getCurrencySymbol(form.state.currencyCode));

	let results = $derived(
		computeResults({
			fees: form.state.fees,
			salesOptions: [
				{
					buyCount: 1,
					freeCount: 0,
					name: 'Single',
					rounding: null
				},
				...form.state.bundles
			],
			productInformation: {
				orderCount: form.state.orderCount || 0,
				unitCost: form.state.unitCost || 0
			},
			scenarios: form.state.scenarios
		})
	);
</script>

<svelte:head>
	<title>Retail Price Calculator</title>
	<meta
		name="description"
		content="This Retail Price Calculator is a tool designed to help you decide how to price your retail products, taking into account a base price, bundles options and various fees."
	/>
</svelte:head>

<div class="mx-auto mb-8 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
	<form class="my-8 flex flex-col gap-6" novalidate>
		<div class="flex flex-row flex-wrap justify-between gap-6">
			<Form.ProductInfoFieldSet
				{currencySymbol}
				bind:orderCount={form.state.orderCount}
				bind:unitCost={form.state.unitCost}
			/>

			<div class="space-between flex flex-row flex-wrap gap-6">
				<Form.SettingsFieldSet bind:currencyCode={form.state.currencyCode} />
				<Form.ActionsFieldSet
					onClearData={form.onClearData}
					onDownload={() => downloadAsCSV(results)}
					onLoadDemoData={form.onLoadDemoData}
				/>
			</div>
		</div>

		<div class="grid-warp grid grid-cols-[repeat(auto-fit,_minmax(150px,auto))] gap-6">
			<Form.ScenariosFieldSet
				class="col-span-2"
				currencyCode={form.state.currencyCode}
				{currencySymbol}
				unitCost={form.state.unitCost}
				bind:scenarios={form.state.scenarios}
			/>
			<Form.BundleOptionsFieldSet class="col-span-3" bind:bundles={form.state.bundles} />
			<Form.FeesFieldSet class="col-span-3" {currencySymbol} bind:fees={form.state.fees} />
		</div>
	</form>

	{#if results}
		<ResultsTable
			columns={results.columns}
			currencyCode={form.state.currencyCode}
			groups={results.groups}
		/>
	{/if}
</div>
