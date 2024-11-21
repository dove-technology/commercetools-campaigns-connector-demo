import type { Cart } from '@commercetools/platform-sdk';
import type { CartCouponCode } from './types/DovetechCouponCodes';

export const getCouponCodes = (cart: Cart): CartCouponCode[] => {
	const serialisedCodes = cart.custom?.fields['dovetech-discounts-couponCodes'] ?? '';

	if (serialisedCodes) {
		return JSON.parse(serialisedCodes);
	}

	return [];
};

export const getCartSubtotal = (cart: Cart | undefined): number => {
	if (!cart) {
		return 0;
	}

	return cart.lineItems.reduce((acc, lineItem) => {
		// handle per quantity discounts

		return acc + lineItem.price.value.centAmount * lineItem.quantity;
	}, 0);
};

export const getCartDiscountAmount = (cart: Cart | undefined): number => {
	if (!cart) {
		return 0;
	}

	return cart.lineItems.reduce((acc, lineItem) => {
		// handle per quantity discounts
		const lineItemPrice = lineItem.price.value.centAmount * lineItem.quantity;
		const lineItemTotalPrice = lineItem.totalPrice.centAmount;
		const discountAmount = lineItemPrice - lineItemTotalPrice;

		return acc + discountAmount;
	}, 0);
};
