import type { CURRENCY_CODES } from './currencies';

export type RetailBundle = {
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

export type RetailScenario = {
	baseListingPrice: number;
	name: string;
	key: string;
};

export type RetailFormState = {
	bundles: RetailBundle[];
	currencyCode: CurrencyCode;
	fees: Fee[];
	orderCount: number | null;
	scenarios: RetailScenario[];
	unitCost: number | null;
};

export type ReverseFormState = {
	currencyCode: CurrencyCode;
	salePrice: number | null;
	fees: Fee[];
};
