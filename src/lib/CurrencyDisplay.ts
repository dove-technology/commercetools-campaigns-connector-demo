import type { TypedMoney } from '@commercetools/platform-sdk';
import { CurrencyValue } from './CurrencyValue';
import CurrencyValueType from './types/CurrencyValueType';

export function formatCurrency(money: TypedMoney) {
	const currencyValue = new CurrencyValue(
		money.centAmount,
		money.fractionDigits,
		CurrencyValueType.MinorUnits
	);

	const formattedValue = new Intl.NumberFormat('en-GB', {
		minimumFractionDigits: money.fractionDigits,
		maximumFractionDigits: money.fractionDigits
	}).format(currencyValue.toCurrencyUnits());

	return `${formattedValue} ${money.currencyCode}`;
}
