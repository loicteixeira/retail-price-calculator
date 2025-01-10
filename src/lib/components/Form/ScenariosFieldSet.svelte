<script lang="ts">
	import type { FormState } from '$lib/types';
	import Button from '../Atoms/Button.svelte';
	import FieldSet from '../Atoms/FieldSet.svelte';
	import Input from '../Atoms/Input.svelte';

	type Props = Pick<FormState, 'scenarios'> & { currencySymbol: string };
	let { currencySymbol, scenarios = $bindable() }: Props = $props();

	function addScenario() {
		scenarios.push({
			baseListingPrice: 0,
			key: crypto.randomUUID(),
			name: ''
		});
	}

	function removeScenario(index: number) {
		scenarios.splice(index, 1);
	}
</script>

<FieldSet title="Scenarios">
	<table class="mr-auto table-fixed">
		<thead>
			<tr class="text-left align-text-top uppercase text-gray-700">
				<th class="px-2">Name</th>
				<th colspan="2" class="px-2 leading-none">
					Listing Price<br />
					<span class="text-[.4em]">in {currencySymbol}</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each scenarios as scenario, index (scenario.key)}
				<tr>
					<td class="w-44 px-2 py-1.5">
						<Input
							aria-label="Name"
							class="w-full"
							id="scenario-{scenario.key}-name"
							type="text"
							bind:value={scenario.name}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-label="Listing Price"
							class="w-20"
							id="scenario-{scenario.key}-baseListingPrice"
							min="0"
							step="1"
							type="number"
							bind:value={scenario.baseListingPrice}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Button title="Delete scenario '{scenario.name}'" onclick={() => removeScenario(index)}>
							<span class="text-xs" aria-hidden="true">╳</span>
						</Button>
					</td>
				</tr>
			{/each}
			<tr>
				<td colspan="5" class="p-3 text-center">
					<Button variant="primary" onclick={addScenario}>+ Add Scenario</Button>
				</td>
			</tr>
		</tbody>
	</table>
</FieldSet>
