import { formatCurrency, formatPercent } from './i18n';
import type { Bundle, CurrencyCode, Fee, Scenario } from './types';

type ComputeResultsOptions = {
	currencyCode: CurrencyCode;
	fees: Pick<Fee, 'amount' | 'name' | 'type'>[];
	productInformation: { orderCount: number; unitCost: number };
	salesOptions: Pick<Bundle, 'buyCount' | 'freeCount' | 'name' | 'rounding'>[];
	scenarios: Pick<Scenario, 'name' | 'baseListingPrice'>[];
};

export type ComputeResultsOutput = {
	columns: { label: string; children?: string[] }[];
	groups: {
		label: string;
		rows: string[][];
	}[];
};

export function computeResults({
	currencyCode,
	fees,
	productInformation,
	salesOptions,
	scenarios
}: ComputeResultsOptions): ComputeResultsOutput | null {
	const columns = [
		{ label: 'Scenario' },
		{ label: 'Name' },
		{ label: 'Listing Price' },
		{ label: 'Fees', children: [...fees.map((fee) => fee.name), 'Total'] },
		{ label: 'Items Cost' },
		{ label: 'Net' },
		{ label: 'Margin' },
		{ label: 'Break Even' }
	];

	const groups = scenarios.map((scenario) => {
		const rows = salesOptions.reduce<ComputeResultsOutput['groups'][0]['rows']>(
			(acc, { buyCount, freeCount, name, rounding }) => {
				let listingPrice = scenario.baseListingPrice * buyCount;
				if (rounding) {
					listingPrice = roundDownToNearest(listingPrice, rounding);
				}

				const calculatedFees = computeFees(listingPrice, fees);
				const itemsCost = productInformation.unitCost * (buyCount + freeCount);
				const net = listingPrice - itemsCost - calculatedFees.total;
				const margin = net / listingPrice;
				const breakEven = Math.ceil(
					(productInformation.orderCount * productInformation.unitCost) / net
				);

				acc.push([
					name,
					formatCurrency(listingPrice, currencyCode),
					...calculatedFees.details.map((v) => formatCurrency(v, currencyCode)),
					formatCurrency(calculatedFees.total, currencyCode),
					formatCurrency(itemsCost, currencyCode),
					formatCurrency(net, currencyCode),
					margin === -Infinity ? '–' : formatPercent(margin),
					isNaN(breakEven) || breakEven === 0 ? '–' : breakEven.toString()
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
