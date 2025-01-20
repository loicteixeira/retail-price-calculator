<script lang="ts">
	import Button from '../Atoms/Button.svelte';
	import FieldSet from '../Atoms/FieldSet.svelte';

	type Props = {
		onClearData: () => void;
		onDownload: () => void;
		onLoadDemoData: () => void;
	};
	let { onClearData, onDownload, onLoadDemoData }: Props = $props();
</script>

<FieldSet class="flex flex-row" title="Actions">
	<div class="flex flex-col gap-2">
		<Button variant="secondary" onclick={onDownload}>Download as CSV</Button>
	</div>
	<div class="mx-2 border-e border-dashed border-gray-300"></div>
	<div class="flex flex-col gap-2">
		<Button variant="secondary" onclick={onLoadDemoData}>Load Demo Data</Button>
		<Button variant="danger" onclick={onClearData}>Clear Calculator</Button>
	</div>
</FieldSet>
