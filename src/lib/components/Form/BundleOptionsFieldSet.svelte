<script lang="ts">
	import type { FormState } from '$lib/types';
	import Button from '../Button.svelte';
	import FieldSet from '../FieldSet.svelte';
	import Input from '../Input.svelte';

	type Props = Pick<FormState, 'bundles'>;
	let { bundles = $bindable() }: Props = $props();

	function addBundle() {
		bundles.push({
			buyCount: 1,
			freeCount: 0,
			key: crypto.randomUUID(),
			name: '',
			rounding: null
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
				<th class="px-2">Name</th>
				<th class="px-2">Buy</th>
				<th class="px-2">Free</th>
				<th colspan="2" class="px-2 leading-none">
					Rounding<br />
					<span class="text-[.4em]">down to nearest</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each bundles as bundle, index (bundle.key)}
				<tr>
					<td class="w-full px-2 py-1.5">
						<Input
							aria-label="Name"
							class="w-full"
							id="bundle-{bundle.key}-name"
							type="text"
							bind:value={bundle.name}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-label="Buy"
							class="w-14"
							id="bundle-{bundle.key}-buyCount"
							min="0"
							step="1"
							type="number"
							bind:value={bundle.buyCount}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-label="Free"
							class="w-14"
							id="bundle-{bundle.key}-freeCount"
							min="0"
							step="1"
							type="number"
							bind:value={bundle.freeCount}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-label="Round down to nearest"
							class="w-20"
							id="bundle-{bundle.key}-rounding"
							min="0"
							step="0.1"
							type="number"
							bind:value={bundle.rounding}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Button title="Delete bundle '{bundle.name}'" onclick={() => removeBundle(index)}>
							<span class="text-xs" aria-hidden="true">╳</span>
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
