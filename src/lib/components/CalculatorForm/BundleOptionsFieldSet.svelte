<script lang="ts">
	import type { CalculatorForm } from '$lib/types';
	import Button from '../Button.svelte';
	import FieldSet from '../FieldSet.svelte';
	import Input from '../Input.svelte';

	type Props = Pick<CalculatorForm, 'bundles'>;
	let { bundles = $bindable() }: Props = $props();

	function addBundle() {
		bundles.push({
			buy: 1,
			free: 0,
			key: crypto.randomUUID(),
			name: '',
			round: null
		});
	}

	function removeBundle(index: number) {
		bundles.splice(index, 1);
	}
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
			{#each bundles as bundle, index (bundle.key)}
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
					<td class="px-2 py-1.5 text-xs">
						<Button title="Delete bundle '{bundle.name}'" onclick={() => removeBundle(index)}>
							<span aria-hidden="true">╳</span>
						</Button>
					</td>
				</tr>
			{/each}
			<tr>
				<td colspan="5" class="p-3 text-center">
					<Button variant="primary" onclick={addBundle}>+ Add Bundle</Button>
				</td>
			</tr>
		</tbody>
	</table>
</FieldSet>
