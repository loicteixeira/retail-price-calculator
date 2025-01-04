import type { Bundle, Fee } from './types';

const BUNDLES: Bundle[] = [
	{ name: '2+1', buy: 2, free: 1, round: null },
	{ name: '3+1', buy: 3, free: 1, round: null },
	{ name: '4+1', buy: 4, free: 1, round: null },
	{ name: '2 discounted', buy: 2, free: 0, round: 5 },
	{ name: '3 discounted', buy: 2, free: 0, round: 5 }
];

const FEES: Fee[] = [
	{ name: 'Taxes', amount: 13.7, type: 'percent' },
	{ name: 'Listing', amount: 0.1, type: 'flat' },
	{ name: 'Transaction Flat', amount: 0.25, type: 'flat' },
	{ name: 'Transaction Percent', amount: 1.5, type: 'percent' },
	{ name: 'Shipping', amount: 5, type: 'flat' }
];

export { BUNDLES, FEES };
