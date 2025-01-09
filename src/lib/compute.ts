import type { Bundle, Fee, Scenario } from './types';

type ComputeResultsOptions = {
	fees: Pick<Fee, 'amount' | 'name' | 'type'>[];
	productInformation: { orderCount: number; unitCost: number };
	salesOptions: Pick<Bundle, 'buyCount' | 'freeCount' | 'name' | 'rounding'>[];
	scenarios: Pick<Scenario, 'name' | 'baseListingPrice'>[];
};

type ComputeResultsOutput = {
	columns: ({ label: string } | { label: string; children: string[] })[];
	groups: {
		label: string;
		rows: string[][];
	}[];
};

export function computeResults({
	fees,
	productInformation,
	salesOptions,
	scenarios
}: ComputeResultsOptions): ComputeResultsOutput {
	const columns = [
		{ label: 'Scenario' },
		{ label: 'Name' },
		{ label: 'Listing Price' },
		{ label: 'Fees', children: [...fees.map((fee) => fee.name), 'Total'] },
		{ label: 'Items Cost' },
		{ label: 'Net' }
	];

	const groups = scenarios.map((scenario) => {
		const rows = salesOptions.reduce<ComputeResultsOutput['groups'][0]['rows']>(
			(acc, { buyCount, freeCount, name, rounding }) => {
				let listingPrice = scenario.baseListingPrice * buyCount;
				if (rounding) {
					listingPrice = Math.floor(listingPrice / rounding) * rounding;
				}

				const calculatedFees = computeFees(listingPrice, fees);

				const itemsCost = productInformation.unitCost * (buyCount + freeCount);

				const net = listingPrice - itemsCost - calculatedFees.total;

				acc.push([
					name,
					// TODO: Proper currency formatting
					listingPrice.toFixed(2),
					...calculatedFees.details.map((v) => v.toFixed(2)),
					calculatedFees.total.toFixed(2),
					itemsCost.toFixed(2),
					net.toFixed(2)
				]);
				return acc;
			},
			[]
		);
		return { label: scenario.name, rows };
	});

	return { columns, groups };
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
