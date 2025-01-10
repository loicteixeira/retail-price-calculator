import type { CURRENCY_CODES } from './currencies';

export type Bundle = {
	buyCount: number;
	freeCount: number;
	key: string;
	name: string;
	rounding: 0.1 | 1 | 5 | 10 | null;
};

export type CurrencyCode = (typeof CURRENCY_CODES)[number];

export type Fee = {
	amount: number;
	key: string;
	name: string;
	type: 'flat' | 'percent';
};

export type Scenario = {
	baseListingPrice: number;
	name: string;
	key: string;
};

export type FormState = {
	bundles: Bundle[];
	currencyCode: CurrencyCode;
	fees: Fee[];
	orderCount: number | null;
	scenarios: Scenario[];
	unitCost: number | null;
};
