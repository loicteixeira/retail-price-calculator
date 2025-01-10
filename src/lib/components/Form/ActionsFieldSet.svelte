<script lang="ts">
	import Button from '../Button.svelte';
	import FieldSet from '../FieldSet.svelte';

	type Props = { onClearData: () => void; onLoadDemoData: () => void };
	let { onClearData, onLoadDemoData }: Props = $props();
</script>

<FieldSet class="flex flex-col gap-2" title="Actions">
	<Button variant="secondary" onclick={onLoadDemoData}>Load Demo Data</Button>
	<Button variant="danger" onclick={onClearData}>Clear Calculator</Button>
</FieldSet>
