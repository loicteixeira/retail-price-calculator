import data from '$lib/data';
import type { FormState } from '$lib/types';
import { useLocalStorage } from '$lib/useLocalStorage.svelte';

export function useState() {
	const startingData = structuredClone(data.demo);
	const storage = useLocalStorage<FormState>('calculator-state', startingData);

	function onClearData() {
		storage.value = structuredClone(data.empty);
	}

	function onLoadDemoData() {
		storage.value = structuredClone(data.demo);
	}

	return {
		get state() {
			return storage.value;
		},
		onClearData,
		onLoadDemoData
	};
}
