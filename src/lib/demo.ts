import type { Bundle, Fee, Scenario } from './types';

const BUNDLES: Bundle[] = [
	{
		buyCount: 2,
		freeCount: 1,
		key: crypto.randomUUID(),
		name: '2+1',
		rounding: null
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
		freeCount: 1,
		key: crypto.randomUUID(),
		name: '4+1',
		rounding: null
	},
	{
		buyCount: 2,
		freeCount: 0,
		key: crypto.randomUUID(),
		name: '2 discounted',
		rounding: 5
	},
	{
		buyCount: 3,
		freeCount: 0,
		key: crypto.randomUUID(),
		name: '3 discounted',
		rounding: 5
	},
	{
		buyCount: 4,
		freeCount: 0,
		key: crypto.randomUUID(),
		name: '4 discounted',
		rounding: 10
	}
];

const FEES: Fee[] = [
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
		amount: 1.5,
		key: crypto.randomUUID(),
		name: 'Transaction Percent',
		type: 'percent'
	},
	{
		amount: 5,
		key: crypto.randomUUID(),
		name: 'Shipping',
		type: 'flat'
	}
];

const SCENARIOS: Scenario[] = [
	{ baseListingPrice: 30, name: 'wholesale', key: crypto.randomUUID() },
	{ baseListingPrice: 60, name: 'retail', key: crypto.randomUUID() }
];

const CURRENCY_SYMBOL: string = '€';
const ORDER_COUNT: number = 100;
const UNIT_COST: number = 12.34;

const DEMO_DATA = {
	bundles: BUNDLES,
	currencySymbol: CURRENCY_SYMBOL,
	fees: FEES,
	orderCount: ORDER_COUNT,
	scenarios: SCENARIOS,
	unitCost: UNIT_COST
};

export { BUNDLES, CURRENCY_SYMBOL, DEMO_DATA, FEES, ORDER_COUNT, SCENARIOS, UNIT_COST };
