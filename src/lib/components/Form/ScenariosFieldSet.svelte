<script lang="ts">
	import { formatCurrency } from '$lib/i18n';
	import type { FormState } from '$lib/types';
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	import Button from '../Atoms/Button.svelte';
	import FieldSet from '../Atoms/FieldSet.svelte';
	import Input from '../Atoms/Input.svelte';

	type Props = Pick<FormState, 'currencyCode' | 'unitCost' | 'scenarios'> &
		Pick<HTMLFieldsetAttributes, 'class'> & {
			currencySymbol: string;
		};
	let {
		currencyCode,
		currencySymbol,
		class: extraClass,
		unitCost = 1,
		scenarios = $bindable()
	}: Props = $props();

	const suggestedWholesale = $derived(Math.round((unitCost ?? 0) * 3));
	const suggestedRetail = $derived(Math.round((unitCost ?? 0) * 6));

	function addScenario(name: string = '', baseListingPrice: number = 0) {
		scenarios.push({ baseListingPrice, key: crypto.randomUUID(), name });
	}

	function addOrUpdateScenario(name: string = '', baseListingPrice: number = 0) {
		const existingScenario = scenarios.find((scenario) => scenario.name === name);
		if (existingScenario) {
			existingScenario.baseListingPrice = baseListingPrice;
		} else {
			addScenario(name, baseListingPrice);
		}
	}

	function removeScenario(index: number) {
		scenarios.splice(index, 1);
	}
</script>

<FieldSet class=" {extraClass}" title="Scenarios">
	<table class="mr-auto table-fixed">
		<thead>
			<tr class="text-left align-text-top uppercase text-gray-700">
				<th class="w-3/5 px-2" id="scenario-name">Name</th>
				<th colspan="2" class="w-2/5 px-2 leading-none" id="scenario-listing-price">
					Listing Price
				</th>
			</tr>
		</thead>
		<tbody>
			{#each scenarios as scenario, index (scenario.key)}
				<tr>
					<td class="px-2 py-1.5">
						<Input
							aria-labelledby="scenario-name"
							id="scenario-{scenario.key}-name"
							type="text"
							bind:value={scenario.name}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-labelledby="scenario-listing-price"
							icon={currencySymbol}
							id="scenario-{scenario.key}-baseListingPrice"
							min="0"
							step="1"
							type="number"
							bind:value={scenario.baseListingPrice}
						/>
					</td>
					<td class="py-1.5">
						<Button title="Delete scenario '{scenario.name}'" onclick={() => removeScenario(index)}>
							<span class="text-xs" aria-hidden="true">╳</span>
						</Button>
					</td>
				</tr>
			{/each}
			<tr>
				<td colspan="3" class="p-3 text-center">
					<Button variant="primary" onclick={() => addScenario()}>+ Add Scenario</Button>
				</td>
			</tr>
			<tr>
				<td colspan="3" class="text-center text-sm text-gray-600">
					<span class="inline-block py-1">Suggested:</span>
					<br />
					<Button
						variant="secondary"
						onclick={() => addOrUpdateScenario('Wholesale', suggestedWholesale)}
					>
						Wholesale: {formatCurrency(suggestedWholesale, currencyCode)}
						<span class="text-xs">(x3 unit cost)</span>
					</Button>
					<br />
					<Button
						variant="secondary"
						onclick={() => addOrUpdateScenario('Retail', suggestedRetail)}
					>
						Retail: {formatCurrency(suggestedRetail, currencyCode)}
						<span class="text-xs">(x6 unit cost)</span>
					</Button>
				</td>
			</tr>
		</tbody>
	</table>
</FieldSet>
