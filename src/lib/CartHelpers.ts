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
		return acc + getLineItemPrice(lineItem) * lineItem.quantity;
	}, 0);
};

export const getCartDiscountAmount = (cart: Cart | undefined): number => {
	if (!cart) {
		return 0;
	}

	return cart.lineItems.reduce((acc, lineItem) => {
		const lineItemPrice = getLineItemPrice(lineItem) * lineItem.quantity;
		const lineItemTotalPrice = getLineItemTotal(lineItem);

		const discountAmount = lineItemPrice - lineItemTotalPrice;

		return acc + discountAmount;
	}, 0);
};

export const getLineItemTotals = (lineItem: LineItem) => {
	return {
		subTotal: getLineItemPrice(lineItem) * lineItem.quantity,
		total: getLineItemTotal(lineItem)
	};
};

const getLineItemPrice = (lineItem: LineItem) => {
	if (lineItem.price.discounted) {
		return lineItem.price.discounted.value.centAmount;
	}

	return lineItem.price.value.centAmount;
};
function getLineItemTotal(lineItem: LineItem) {
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
}
