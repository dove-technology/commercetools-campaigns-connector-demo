import type { TypedMoney } from '@commercetools/platform-sdk';
import { CurrencyValue } from './CurrencyValue';
import CurrencyValueType from './types/CurrencyValueType';

export function formatMoney(money: TypedMoney, currentLanguage: string) {
	return formatCurrencyMinorUnits(
		money.centAmount,
		money.fractionDigits,
		money.currencyCode,
		currentLanguage
	);
}

export function formatCurrencyMinorUnits(
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
