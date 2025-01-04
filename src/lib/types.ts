export type Bundle = {
	name: string;
	buy: number;
	free: number;
	round: number | null;
};

export type Fee = {
	name: string;
	amount: number;
	type: 'flat' | 'percent';
};

export type CalculatorForm = {
	unitCost: number | null;
	orderCount: number | null;
	currencySymbol: string;
	bundles: Bundle[];
	fees: Fee[];
};
