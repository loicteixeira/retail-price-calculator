<script lang="ts">
	import type { FormState } from '$lib/types';
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	import Button from '../Atoms/Button.svelte';
	import FieldSet from '../Atoms/FieldSet.svelte';
	import Input from '../Atoms/Input.svelte';

	type Props = Pick<FormState, 'fees'> &
		Pick<HTMLFieldsetAttributes, 'class'> & { currencySymbol: string };
	let { currencySymbol, fees = $bindable(), class: extraClass }: Props = $props();

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

<FieldSet class=" {extraClass}" title="Fees">
	<table class="mr-auto table-fixed">
		<thead>
			<tr class="h-[2.3rem] text-left align-text-top uppercase text-gray-700">
				<th class="w-3/5 px-2" id="fee-name">Name</th>
				<th class="w-1/5 px-2" id="fee-amount">Amount</th>
				<th class="w-1/5 px-2" colspan="2" id="fee-type">Type</th>
			</tr>
		</thead>
		<tbody>
			{#each fees as fee, index (fee.key)}
				<tr>
					<td class="px-2 py-1.5">
						<Input
							aria-labelledby="fee-name"
							id="fee-{fee.key}-name"
							type="text"
							bind:value={fee.name}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-labelledby="fee-amount"
							id="fee-{fee.key}-amount"
							type="number"
							bind:value={fee.amount}
						/>
					</td>
					<td class="px-2 py-1.5">
						<select
							aria-labelledby="fee-type"
							class="mt-1 block rounded border-gray-300 focus:border-teal-700 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
							id="fee-{fee.key}-type"
						>
							<option selected={fee.type == 'flat'}>{currencySymbol}</option>
							<option selected={fee.type == 'percent'}>%</option>
						</select>
					</td>
					<td class="py-1.5">
						<Button title="Delete fee #{index + 1} ({fee.name})" onclick={() => removeFee(index)}>
							<span class="text-xs" aria-hidden="true">╳</span>
						</Button>
					</td>
				</tr>
			{/each}
			<tr>
				<td colspan="5" class="p-3 text-center">
					<Button variant="primary" onclick={addFee}>+ Add Fee</Button>
				</td>
			</tr>
		</tbody>
	</table>
</FieldSet>
