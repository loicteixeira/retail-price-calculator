import type { ComputeResultsOutput } from './compute';
import Papa from 'papaparse';

export function downloadAsCSV(results: ComputeResultsOutput | null) {
	if (!results) return;

	const { columns, groups } = results;

	const columnNames = columns.flatMap((column) =>
		column.children
			? column.children.map((child) => `${column.label} – ${child.label}`)
			: column.label
	);
	const rows = groups.flatMap((group) =>
		group.rows.map((row) => [group.label, ...row.map((cell) => cell.value)])
	);

	const data = Papa.unparse({ fields: columnNames, data: rows });

	download(data, `retail-price-calculator-${new Date().toJSON().slice(0, 10)}`);
}

function download(fileContent: string, filename: string) {
	const data = new Blob([`\ufeff${fileContent}`], { type: 'text/csv;charset=utf-8;' });
	const url = window.URL.createObjectURL(data);

	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${filename}.csv`);
	link.click();
	link.remove();
}
