import type { Bundle, Fee } from './types';

const BUNDLES: Bundle[] = [
	{
		buy: 2,
		free: 1,
		key: crypto.randomUUID(),
		name: '2+1',
		round: null
	},
	{
		buy: 3,
		free: 1,
		key: crypto.randomUUID(),
		name: '3+1',
		round: null
	},
	{
		buy: 4,
		free: 1,
		key: crypto.randomUUID(),
		name: '4+1',
		round: null
	},
	{
		buy: 2,
		free: 0,
		key: crypto.randomUUID(),
		name: '2 discounted',
		round: 5
	},
	{
		buy: 3,
		free: 0,
		key: crypto.randomUUID(),
		name: '3 discounted',
		round: 5
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

const CURRENCY_SYMBOL: string = '€';
const ORDER_COUNT: number = 100;
const UNIT_COST: number = 12;

const DEMO_DATA = {
	unitCost: UNIT_COST,
	orderCount: ORDER_COUNT,
	currencySymbol: CURRENCY_SYMBOL,
	bundles: BUNDLES,
	fees: FEES
};

export { BUNDLES, CURRENCY_SYMBOL, DEMO_DATA, FEES, ORDER_COUNT, UNIT_COST };
