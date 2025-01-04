<script lang="ts">
	import type { CalculatorForm } from '$lib/types';
	import FieldSet from '../FieldSet.svelte';
	import Input from '../Input.svelte';

	type Props = Pick<CalculatorForm, 'currencySymbol' | 'fees'>;
	let { currencySymbol, fees = $bindable() }: Props = $props();

	function addFee() {
		fees.push({
			amount: 0,
			key: crypto.randomUUID(),
			name: '',
			type: 'flat'
		});
	}

	function removeFee(index: number) {
		fees.splice(index, 1);
	}
</script>

<FieldSet class="grow" title="Fees">
	<table class="mr-auto table-fixed">
		<thead>
			<tr class="h-[3.2rem] text-left align-text-top uppercase text-gray-700">
				<th class="p-2">Name</th>
				<th class="p-2">Amount</th>
				<th class="p-2">Type</th>
				<th>&nbsp;</th>
			</tr>
		</thead>
		<tbody>
			{#each fees as fee, index (fee.key)}
				<tr>
					<td class="w-full px-2 py-1.5">
						<Input aria-label="Name" class="w-full" id="" type="text" bind:value={fee.name} />
					</td>
					<td class="px-2 py-1.5">
						<Input aria-label="Amount" class="w-20" id="" type="number" bind:value={fee.amount} />
					</td>
					<td class="px-2 py-1.5">
						<select
							id=""
							aria-label="type"
							class="w-18 mt-1 block rounded border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
						>
							<option selected={fee.type == 'flat'}>{currencySymbol}</option>
							<option selected={fee.type == 'percent'}>%</option>
						</select>
					</td>
					<td class="px-2 py-1.5">
						<button class="text-xs" onclick={() => removeFee(index)}>╳</button>
					</td>
				</tr>
			{/each}
			<tr>
				<td colspan="5" class="p-3">
					<button class="text-blue-700" onclick={addFee}>+ Add Fee</button>
				</td>
			</tr>
		</tbody>
	</table>
</FieldSet>
