import type { Scenario } from './types';

type ComputeResultsOptions = {
	fees: {
		amount: number;
		name: string;
		type: 'flat' | 'percent';
	}[];
	salesOptions: {
		buyCount: number;
		freeCount: number;
		name: string;
		rounding: number | null;
	}[];
	productInformation: {
		orderCount: number;
		unitCost: number;
	};
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
	salesOptions,
	scenarios
}: ComputeResultsOptions): ComputeResultsOutput {
	const columns = [
		{ label: 'Scenario' },
		{ label: 'Name' },
		{ label: 'Listing Price' },
		{ label: 'Fees', children: [...fees.map((fee) => fee.name), 'Total'] }
	];

	const groups = scenarios.map((scenario) => {
		const rows = salesOptions.reduce<ComputeResultsOutput['groups'][0]['rows']>(
			(acc, { buyCount, name, rounding }) => {
				let listingPrice = scenario.baseListingPrice * buyCount;
				if (rounding) {
					listingPrice = Math.floor(listingPrice / rounding) * rounding;
				}

				const calculatedFees = computeFees(listingPrice, fees);

				acc.push([
					name,
					// TODO: Proper currency formatting
					listingPrice.toFixed(2),
					...calculatedFees.details.map((v) => v.toFixed(2)),
					calculatedFees.total.toFixed(2)
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
