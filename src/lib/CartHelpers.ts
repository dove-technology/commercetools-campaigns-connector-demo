import type { Cart } from '@commercetools/platform-sdk';
import type { CartCouponCode } from './types/DovetechCouponCodes';

export const getCouponCodes = (cart: Cart): CartCouponCode[] => {
	let serialisedCodes = cart.custom?.fields['dovetech-discounts-couponCodes'] ?? '';

	if (serialisedCodes) {
		return JSON.parse(serialisedCodes);
	}

	return [];
};
