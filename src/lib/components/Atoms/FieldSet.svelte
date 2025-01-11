<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { children: Snippet; class?: string; title: string };
	let { children, class: extraClasses, title }: Props = $props();
</script>

<fieldset class={['rounded border border-solid border-gray-300 p-3', extraClasses]}>
	<legend class="px-2">{title}</legend>
	{@render children()}
</fieldset>
