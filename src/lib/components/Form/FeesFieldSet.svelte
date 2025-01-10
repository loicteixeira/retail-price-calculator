<script lang="ts">
	import type { FormState } from '$lib/types';
	import Button from '../Atoms/Button.svelte';
	import FieldSet from '../Atoms/FieldSet.svelte';
	import Input from '../Atoms/Input.svelte';

	type Props = Pick<FormState, 'fees'> & { currencySymbol: string };
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
			<tr class="h-[2.3rem] text-left align-text-top uppercase text-gray-700">
				<th class="px-2">Name</th>
				<th class="px-2">Amount</th>
				<th class="px-2">Type</th>
				<th>&nbsp;</th>
			</tr>
		</thead>
		<tbody>
			{#each fees as fee, index (fee.key)}
				<tr>
					<td class="w-full px-2 py-1.5">
						<Input
							aria-label="Name"
							class="w-full"
							id="fee-{fee.key}-name"
							type="text"
							bind:value={fee.name}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-label="Amount"
							class="w-20"
							id="fee-{fee.key}-amount"
							type="number"
							bind:value={fee.amount}
						/>
					</td>
					<td class="px-2 py-1.5">
						<select
							id="fee-{fee.key}-type"
							aria-label="type"
							class="w-18 mt-1 block rounded border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
						>
							<option selected={fee.type == 'flat'}>{currencySymbol}</option>
							<option selected={fee.type == 'percent'}>%</option>
						</select>
					</td>
					<td class="py-1.5">
						<Button onclick={() => removeFee(index)}>
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
