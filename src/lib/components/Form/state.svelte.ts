import data from '$lib/data';
import type { FormState } from '$lib/types';

export function useState() {
	const startingData = structuredClone(data.demo);
	let state = $state<FormState>(startingData);

	function onClearData() {
		state = structuredClone(data.empty);
	}

	function onLoadDemoData() {
		state = structuredClone(data.demo);
	}

	return {
		onClearData,
		onLoadDemoData,
		state
	};
}
