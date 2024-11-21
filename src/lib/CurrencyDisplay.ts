import type { TypedMoney } from '@commercetools/platform-sdk';
import { CurrencyValue } from './CurrencyValue';
import CurrencyValueType from './types/CurrencyValueType';

export function formatCurrency(money: TypedMoney, currentLanguage: string) {
	const currencyValue = new CurrencyValue(
		money.centAmount,
		money.fractionDigits,
		CurrencyValueType.MinorUnits
	);

	const formattedValue = new Intl.NumberFormat(currentLanguage, {
		minimumFractionDigits: money.fractionDigits,
		maximumFractionDigits: money.fractionDigits
	}).format(currencyValue.toCurrencyUnits());

	return `${formattedValue} ${money.currencyCode}`;
}

export function formatFractionalDigits(
	centAmount: number,
	fractionDigits: number,
	currencyCode: string,
	currentLanguage: string
) {
	const currencyValue = new CurrencyValue(centAmount, fractionDigits, CurrencyValueType.MinorUnits);

	const formattedValue = new Intl.NumberFormat(currentLanguage, {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits
	}).format(currencyValue.toCurrencyUnits());

	return `${formattedValue} ${currencyCode}`;
}
