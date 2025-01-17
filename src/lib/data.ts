import type { FormState } from './types';

const demo: FormState = {
	bundles: [
		{
			buyCount: 2,
			freeCount: 0,
			key: crypto.randomUUID(),
			name: '2 discounted',
			rounding: 5
		},
		{
			buyCount: 2,
			freeCount: 1,
			key: crypto.randomUUID(),
			name: '2+1',
			rounding: null
		},
		{
			buyCount: 3,
			freeCount: 0,
			key: crypto.randomUUID(),
			name: '3 discounted',
			rounding: 5
		},
		{
			buyCount: 3,
			freeCount: 1,
			key: crypto.randomUUID(),
			name: '3+1',
			rounding: null
		},
		{
			buyCount: 4,
			freeCount: 0,
			key: crypto.randomUUID(),
			name: '4 discounted',
			rounding: 10
		},
		{
			buyCount: 4,
			freeCount: 1,
			key: crypto.randomUUID(),
			name: '4+1',
			rounding: null
		}
	],
	currencyCode: 'EUR',
	fees: [
		{
			amount: 13.7,
			key: crypto.randomUUID(),
			name: 'Taxes',
			type: 'percent'
		},
		{
			amount: 0.1,
			key: crypto.randomUUID(),
			name: 'Listing',
			type: 'flat'
		},
		{
			amount: 0.25,
			key: crypto.randomUUID(),
			name: 'Transaction Flat',
			type: 'flat'
		},
		{
			amount: 1.75,
			key: crypto.randomUUID(),
			name: 'Transaction Percent',
			type: 'percent'
		},
		{
			amount: 0.5,
			key: crypto.randomUUID(),
			name: 'Packaging',
			type: 'flat'
		}
	],
	orderCount: 100,
	scenarios: [
		{ baseListingPrice: 10, name: 'Wholesale', key: crypto.randomUUID() },
		{ baseListingPrice: 20, name: 'Retail', key: crypto.randomUUID() }
	],
	unitCost: 3.5
};

const empty: FormState = {
	bundles: [],
	currencyCode: 'EUR',
	fees: [],
	orderCount: null,
	scenarios: [],
	unitCost: null
};

export default { demo, empty };
