<script lang="ts">
	import type { ComputeFlatResultsOutput } from '$lib/compute';
	import type { CurrencyCode } from '$lib/types';
	import ResultsCell from '../Shared/Results/ResultsCell.svelte';

	type Props = ComputeFlatResultsOutput & { currencyCode: CurrencyCode };
	let { columns, currencyCode, rows }: Props = $props();
	let columnIds = $derived(
		columns.flatMap((column) => column.children?.map((child) => child.id) ?? column.id)
	);
</script>

<div class="overflow-x-auto rounded border border-gray-300">
	<table class="table-auto border-inherit">
		<thead
			class="text-md border-inherit bg-gray-100 text-center align-text-top uppercase tracking-wide text-gray-700"
		>
			<tr class="border-inherit">
				{#each columns as column}
					<th
						class={[
							'border-inherit px-4 py-3 [&:not(:last-child)]:border-e',
							!column.children && 'border-b '
						]}
						colspan={column.children ? column.children.length : 1}
						rowspan={column.children ? 1 : 2}
					>
						{column.label}
					</th>
				{/each}
			</tr>
			<tr class="border-inherit">
				{#each columns as column}
					{#if column.children}
						{#each column.children as child}
							<th class="border border-inherit px-4 py-3">{child.label}</th>
						{/each}
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody class="border-inherit">
			{#each rows as row}
				<tr class="border-b border-inherit">
					{#each row as { type, value, warning }, cellIndex}
						<ResultsCell {type} {value} {warning} id={columnIds[cellIndex + 1]} {currencyCode} />
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
