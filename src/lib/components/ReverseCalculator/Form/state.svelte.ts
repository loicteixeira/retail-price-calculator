import { browser } from '$app/environment';
import data from '$lib/data';
import type { ReverseFormState } from '$lib/types';
import { useLocalStorage } from '$lib/useLocalStorage.svelte';

export function useState() {
	const startingData = structuredClone(browser ? data.reverseDemo : data.reverseEmpty);
	const storage = useLocalStorage<ReverseFormState>('reverse-calculator-state', startingData);

	function onClearData() {
		storage.value = structuredClone(data.reverseEmpty);
	}

	function onLoadDemoData() {
		storage.value = structuredClone(data.reverseDemo);
	}

	return {
		get state() {
			return storage.value;
		},
		onClearData,
		onLoadDemoData
	};
}
