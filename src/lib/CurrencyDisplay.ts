import type { TypedMoney } from '@commercetools/platform-sdk';
import { CurrencyValue } from './CurrencyValue';
import CurrencyValueType from './types/CurrencyValueType';

export function formatCurrency(money: TypedMoney) {
	const currencyValue = new CurrencyValue(
		money.centAmount,
		money.fractionDigits,
		CurrencyValueType.MinorUnits
	);
	return `${currencyValue.toCurrencyUnits()} ${money.currencyCode}`;
}
