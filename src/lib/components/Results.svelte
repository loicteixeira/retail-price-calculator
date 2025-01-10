<script lang="ts">
	import type { ComputeResultsOutput } from '$lib/compute';

	let { columns, groups }: ComputeResultsOutput = $props();
</script>

<div class="overflow-x-auto rounded border border-gray-300">
	<table class="table-auto border-inherit">
		<thead
			class="text-md border-inherit bg-gray-100 text-center align-text-top uppercase tracking-wide text-gray-700"
		>
			<tr class="border-inherit">
				{#each columns as column}
					<th
						class="border-inherit px-4 py-3 [&:not(:last-child)]:border-e"
						colspan={column.children ? column.children.length : 1}
					>
						{column.label}
					</th>
				{/each}
			</tr>
			<tr class="border-inherit">
				{#each columns as column}
					{#if column.children}
						{#each column.children as child}
							<th class="border border-inherit px-4 py-3">{child}</th>
						{/each}
					{:else}
						<th class="border-b border-inherit px-4 py-3 [&:not(:last-child)]:border-e">&nbsp;</th>
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody class="border-inherit">
			{#each groups as group}
				<tr class="border-b border-inherit">
					<td
						class="border-inherit px-4 py-3 [&:not(:last-child)]:border-e"
						rowspan={group.rows.length}
					>
						{group.label}
					</td>
					{#each group.rows[0] as cell}
						<td class="border-inherit px-4 py-3 [&:not(:last-child)]:border-e">{cell}</td>
					{/each}
				</tr>
				{#each group.rows.slice(1) as cells}
					<tr class="border-inherit [&:not(:last-child)]:border-b">
						{#each cells as cell}
							<td class="border-inherit px-4 py-3 [&:not(:last-child)]:border-e">{cell}</td>
						{/each}
					</tr>
				{/each}
			{/each}
		</tbody>
	</table>
</div>
