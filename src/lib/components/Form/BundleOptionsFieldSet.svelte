<script lang="ts">
	import type { FormState } from '$lib/types';
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	import Button from '../Atoms/Button.svelte';
	import FieldSet from '../Atoms/FieldSet.svelte';
	import Input from '../Atoms/Input.svelte';

	type Props = Pick<FormState, 'bundles'> & Pick<HTMLFieldsetAttributes, 'class'>;
	let { bundles = $bindable(), class: extraClass }: Props = $props();

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

<FieldSet class=" {extraClass}" title="Bundle Options">
	<table class="mr-auto table-fixed">
		<thead>
			<tr class="text-left align-text-top uppercase text-gray-700">
				<th class="w-3/6 px-2" id="bundle-name">Name</th>
				<th class="w-1/6 px-2 leading-none" id="bundle-buy-count">
					Buy<br />
					<span class="text-[.4em]">count</span>
				</th>
				<th class="w-1/6 px-2 leading-none" id="bundle-free-count">
					Free<br />
					<span class="text-[.4em]">count</span>
				</th>
				<th colspan="2" class="w-1/6 px-2 leading-none" id="bundle-rounding">
					Rounding<br />
					<span class="text-[.4em]">down to nearest</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each bundles as bundle, index (bundle.key)}
				<tr>
					<td class="px-2 py-1.5">
						<Input
							aria-labelledby="bundle-name"
							id="bundle-{bundle.key}-name"
							type="text"
							bind:value={bundle.name}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-labelledby="bundle-buy-count"
							id="bundle-{bundle.key}-buyCount"
							min="0"
							step="1"
							type="number"
							bind:value={bundle.buyCount}
						/>
					</td>
					<td class="px-2 py-1.5">
						<Input
							aria-labelledby="bundle-free-count"
							id="bundle-{bundle.key}-freeCount"
							min="0"
							step="1"
							type="number"
							bind:value={bundle.freeCount}
						/>
					</td>
					<td class="px-2 py-1.5">
						<select
							aria-labelledby="bundle-rounding"
							class="mt-1 block w-20 rounded border-gray-300 focus:border-teal-700 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
							id="bundle-{bundle.key}-rounding"
							bind:value={bundle.rounding}
						>
							<option value={null} aria-label="None"></option>
							<option value={0.1}>0.1</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={5}>5</option>
							<option value={10}>10</option>
						</select></td
					>
					<td class="py-1.5">
						<Button
							title="Delete bundle #{index + 1} ({bundle.name})"
							onclick={() => removeBundle(index)}
						>
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
