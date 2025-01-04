<script lang="ts">
	import type { CalculatorForm } from '$lib/types';
	import FieldSet from '../FieldSet.svelte';
	import Input from '../Input.svelte';

	type Props = Pick<CalculatorForm, 'bundles'>;
	let { bundles = $bindable() }: Props = $props();
</script>

<FieldSet class="grow" title="Bundle Options">
	<table class="mr-auto table-fixed">
		<thead>
			<tr class="text-left align-text-top uppercase text-gray-700">
				<th class="p-2">Name</th>
				<th class="p-2">Buy</th>
				<th class="p-2">Free</th>
				<th colspan="2" class="p-2 leading-none">
					Rounding<br />
					<span class="text-[.4em]">down to nearest</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each bundles as bundle}
				<tr>
					<td class="w-full px-2 py-1.5">
						<Input aria-label="Name" class="w-full" id="" type="text" bind:value={bundle.name} />
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-label="Buy"
							class=" w-14"
							id=""
							min="0"
							step="1"
							type="number"
							bind:value={bundle.buy}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-label="Free"
							class=" w-14"
							id=""
							min="0"
							step="1"
							type="number"
							bind:value={bundle.free}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-label="Round down to nearest"
							class=" w-20"
							id=""
							min="0"
							step="0.1"
							type="number"
							bind:value={bundle.round}
						/>
					</td>
					<td class="px-2 py-1.5"><button class="text-xs">╳</button></td>
				</tr>
			{/each}
			<tr>
				<td colspan="5" class="p-3">
					<button class="text-blue-700">+ Add Bundle</button>
				</td>
			</tr>
		</tbody>
	</table>
</FieldSet>
