<script lang="ts">
	import { browser } from '$app/environment';
	import ResultsTable from '$lib/components/ReverseCalculator/ResultsTable.svelte';
	import * as ReverseForm from '$lib/components/ReverseCalculator/Form';
	import { computeReverseResults } from '$lib/compute';
	import { getCurrencySymbol } from '$lib/i18n';

	const form = ReverseForm.useState();

	let currencySymbol = $derived(getCurrencySymbol(form.state.currencyCode));

	let results = $derived(
		computeReverseResults({
			fees: form.state.fees,
			salePrice: form.state.salePrice
		})
	);
</script>

<svelte:head>
	<title>Reverse – Price Calculator</title>
	<meta
		name="description"
		content="This reverse calculator is a tool designed to help you understand how much money you have left after deducting various fees."
	/>
</svelte:head>

{#if browser}
	<div class="mx-auto mb-8 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-wrap items-start gap-12">
			<form class="flex flex-col gap-6" novalidate>
				<div class="flex flex-row flex-wrap justify-between gap-6">
					<ReverseForm.PriceFieldSet {currencySymbol} bind:salePrice={form.state.salePrice} />
					<ReverseForm.SettingsFieldSet bind:currencyCode={form.state.currencyCode} />
					<ReverseForm.ActionsFieldSet
						onClearData={form.onClearData}
						onLoadDemoData={form.onLoadDemoData}
					/>
				</div>

				<ReverseForm.FeesFieldSet {currencySymbol} bind:fees={form.state.fees} />
			</form>

			{#if results}
				<div class="mt-3">
					<ResultsTable
						columns={results.columns}
						currencyCode={form.state.currencyCode}
						rows={results.rows}
					/>
				</div>
			{/if}
		</div>
	</div>
{/if}
