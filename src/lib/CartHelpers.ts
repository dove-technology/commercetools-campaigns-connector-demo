import type { Cart, LineItem } from '@commercetools/platform-sdk';
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
		return acc + getLineItemSubtotal(lineItem);
	}, 0);
};

export const getCartDiscountAmount = (cart: Cart | undefined): number => {
	if (!cart) {
		return 0;
	}

	const lineItemsDiscountAmount = cart.lineItems.reduce((acc, lineItem) => {
		const lineItemSubtotal = getLineItemSubtotal(lineItem);
		const lineItemTotal = getLineItemTotal(lineItem);

		const discountAmount = lineItemSubtotal - lineItemTotal;

		return acc + discountAmount;
	}, 0);

	// include discountOnTotalPrice for completeness, Dovetech won't return discounts like this
	return lineItemsDiscountAmount + (cart.discountOnTotalPrice?.discountedAmount?.centAmount ?? 0);
};

export const getLineItemSubtotal = (lineItem: LineItem) => {
	return getLineItemPrice(lineItem) * lineItem.quantity;
};

export const getLineItemTotal = (lineItem: LineItem) => {
	if (lineItem.discountedPricePerQuantity.length > 0) {
		return lineItem.discountedPricePerQuantity.reduce((acc, discountedLineItemPriceForQuantity) => {
			const lineItemPriceForQuantity =
				discountedLineItemPriceForQuantity.quantity *
				discountedLineItemPriceForQuantity.discountedPrice.value.centAmount;

			return acc + lineItemPriceForQuantity;
		}, 0);
	} else {
		return lineItem.totalPrice.centAmount;
	}
};

const getLineItemPrice = (lineItem: LineItem) => {
	if (lineItem.price.discounted) {
		return lineItem.price.discounted.value.centAmount;
	}

	return lineItem.price.value.centAmount;
};
