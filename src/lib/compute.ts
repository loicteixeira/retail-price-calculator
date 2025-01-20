import { formatCurrency, formatPercent } from './i18n';
import type { Bundle, CurrencyCode, Fee, Scenario } from './types';

type ComputeResultsOptions = {
	currencyCode: CurrencyCode;
	fees: Pick<Fee, 'amount' | 'name' | 'type'>[];
	productInformation: { orderCount: number; unitCost: number };
	salesOptions: Pick<Bundle, 'buyCount' | 'freeCount' | 'name' | 'rounding'>[];
	scenarios: Pick<Scenario, 'name' | 'baseListingPrice'>[];
};

type ResultsBaseColumn = { id: string; label: string };
export type ResultsColumn = ResultsBaseColumn & { children?: ResultsBaseColumn[] };
export type ResultsRow = { type: 'text' | 'number'; value: string; warning?: string | null };

export type ComputeResultsOutput = {
	columns: ResultsColumn[];
	groups: { label: string; rows: ResultsRow[][] }[];
};

export function computeResults({
	currencyCode,
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

				acc.push([
					{ type: 'text', value: name },
					{ type: 'number', value: formatCurrency(listingPrice, currencyCode) },
					...calculatedFees.details.map((v) => ({
						type: 'number' as const,
						value: formatCurrency(v, currencyCode)
					})),
					{ type: 'number', value: formatCurrency(calculatedFees.total, currencyCode) },
					{ type: 'number', value: formatCurrency(itemsCost, currencyCode) },
					{
						type: 'number',
						value: formatCurrency(net, currencyCode),
						warning: net <= 0 ? 'Negative net, you are losing money with each sale!' : null
					},
					{
						type: 'number',
						value: margin !== null ? formatPercent(margin) : '–',
						warning:
							margin !== null && margin <= 0
								? 'Negative margin, you are losing money with each sale!'
								: null
					},
					{
						type: 'number',
						value: breakEven !== null ? breakEven.toString() : '–',
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
