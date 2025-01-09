export type Bundle = {
	buy: number;
	free: number;
	key: string;
	name: string;
	round: number | null;
};

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
	currencySymbol: string;
	fees: Fee[];
	orderCount: number | null;
	scenarios: Scenario[];
	unitCost: number | null;
};
