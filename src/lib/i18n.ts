import type { CurrencyCode } from './types';

const locale = navigator.language ?? 'en-US';

export function getCurrencySymbol(currencyCode: CurrencyCode = 'USD') {
	try {
		return (
			new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode })
				.formatToParts(1)
				.find(({ type }) => type === 'currency')?.value || '$'
		);
	} catch (error) {
		if (error instanceof RangeError) return '$';
		throw error;
	}
}

export function formatCurrency(value: number, currencyCode: CurrencyCode) {
	try {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currencyCode
		}).format(value);
	} catch (error) {
		if (error instanceof RangeError) return '$';
		throw error;
	}
}

export function formatPercent(value: number) {
	try {
		return new Intl.NumberFormat(locale, {
			style: 'percent'
		}).format(value);
	} catch (error) {
		if (error instanceof RangeError) return '$';
		throw error;
	}
}
