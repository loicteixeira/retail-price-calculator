import { browser } from '$app/environment';
import data from '$lib/data';
import type { RetailFormState } from '$lib/types';
import { useLocalStorage } from '$lib/useLocalStorage.svelte';

export function useState() {
	const startingData = structuredClone(browser ? data.retailDemo : data.retailEmpty);
	const storage = useLocalStorage<RetailFormState>('calculator-state', startingData);

	function onClearData() {
		storage.value = structuredClone(data.retailEmpty);
	}

	function onLoadDemoData() {
		storage.value = structuredClone(data.retailDemo);
	}

	return {
		get state() {
			return storage.value;
		},
		onClearData,
		onLoadDemoData
	};
}
