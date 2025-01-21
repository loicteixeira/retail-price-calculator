import type { Bundle, Fee, Scenario } from './types';

type ComputeResultsOptions = {
	fees: Pick<Fee, 'amount' | 'name' | 'type'>[];
	productInformation: { orderCount: number; unitCost: number };
	salesOptions: Pick<Bundle, 'buyCount' | 'freeCount' | 'name' | 'rounding'>[];
	scenarios: Pick<Scenario, 'name' | 'baseListingPrice'>[];
};

type ResultsBaseColumn = { id: string; label: string };
export type ResultsColumn = ResultsBaseColumn & { children?: ResultsBaseColumn[] };
export type ResultsRow = {
	type: 'currency' | 'number' | 'percent' | 'text';
	value: string | number | null;
	warning?: string | null;
};

export type ComputeResultsOutput = {
	columns: ResultsColumn[];
	groups: { label: string; rows: ResultsRow[][] }[];
};

export function computeResults({
	fees,
	productInformation,
	salesOptions,
	scenarios
}: ComputeResultsOptions): ComputeResultsOutput | null {
	const columns: ResultsColumn[] = [
		{ id: 'scenario-name', label: 'Scenario Name' },
		{ id: 'bundle-name', label: 'Bundle Name' },
		{ id: 'listing', label: 'Listing Price' },
		{
			id: 'fees',
			label: 'Fees',
			children: [
				...fees.map((fee) => ({ id: 'fees', label: fee.name })),
				{ id: 'fees-total', label: 'Total' }
			]
		},
		{ id: 'items', label: 'Items Cost' },
		{ id: 'net', label: 'Net' },
		{ id: 'margin', label: 'Margin' },
		{ id: 'break-even', label: 'Break Even' }
	];

	const groups = scenarios.map((scenario) => {
		const rows = salesOptions.reduce<ComputeResultsOutput['groups'][0]['rows']>(
			(acc, { buyCount, freeCount, name, rounding }) => {
				let listingPrice = scenario.baseListingPrice * buyCount;
				if (rounding) {
					listingPrice = roundDownToNearest(listingPrice, rounding);
				}

				const calculatedFees = computeFees(listingPrice, fees);
				const itemsCount = buyCount + freeCount;
				const itemsCost = productInformation.unitCost * itemsCount;
				const net = listingPrice - itemsCost - calculatedFees.total;

				let margin: number | null = net / listingPrice;
				margin = isNaN(margin) || margin === -Infinity ? null : margin;

				let breakEven: number | null =
					Math.ceil((productInformation.orderCount * productInformation.unitCost) / net) *
					itemsCount;
				breakEven = isNaN(breakEven) || breakEven === Infinity || breakEven <= 0 ? null : breakEven;

				// TODO: Fix rounding

				acc.push([
					{ type: 'text', value: name },
					{ type: 'currency', value: round(listingPrice, 2) },
					...calculatedFees.details.map((v) => ({ type: 'currency' as const, value: round(v, 2) })),
					{ type: 'currency', value: round(calculatedFees.total, 2) },
					{ type: 'currency', value: round(itemsCost, 2) },
					{
						type: 'currency',
						value: round(net, 2),
						warning: net <= 0 ? 'Negative net, you are losing money with each sale!' : null
					},
					{
						type: 'percent',
						value: margin !== null ? round(margin, 2) : margin,
						warning:
							margin !== null && margin <= 0
								? 'Negative margin, you are losing money with each sale!'
								: null
					},
					{
						type: 'number',
						value: breakEven !== null ? round(breakEven, 2) : breakEven,
						warning:
							breakEven !== null && breakEven >= productInformation.orderCount
								? 'It would take more sales than you have inventory to break even!'
								: null
					}
				]);
				return acc;
			},
			[]
		);
		return { label: scenario.name, rows };
	});

	return groups.length !== 0 ? { columns, groups } : null;
}

function computeFees(listingPrice: number, fees: ComputeResultsOptions['fees']) {
	const details = fees.map((fee) => {
		switch (fee.type) {
			case 'flat':
				return fee.amount;
			case 'percent':
				return (listingPrice * fee.amount) / 100;
		}
	});
	const total = details.reduce((a, b) => a + b, 0);
	return { details, total };
}

function roundDownToNearest(value: number, rounding: NonNullable<Bundle['rounding']>) {
	const rounded = Math.floor(value / rounding) * rounding;
	return rounded === value ? rounded - rounding : rounded;
}

function round(value: number, precision: number) {
	const factor = Math.pow(10, precision);
	return Math.round(value * factor) / factor;
}
