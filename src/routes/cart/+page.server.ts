import type { PageServerLoad, Actions } from './$types';
import { fail, type Cookies, type RequestEvent } from '@sveltejs/kit';
import {
	addCouponCode,
	getCart,
	updateCouponCodes,
	changeLineItemQuantity
} from '$lib/CartService';
import type { ClientResponse } from '@commercetools/ts-client';
import { getCouponCodes } from '$lib/CartHelpers';

export const load: PageServerLoad = async ({ cookies }: RequestEvent) => {
	let cartId = cookies.get('cartId');

	if (!cartId) {
		return {
			cart: undefined
		};
	}

	return {
		cart: await getCart(cartId)
	};
};

export const actions = {
	addCouponCode: async ({ request, cookies }) => {
		const data = await request.formData();
		const couponCode = data.get('coupon-code');

		if (!couponCode) {
			return fail(400, { error: 'Enter a code' });
		}

		const cart = await getCartFromSession(cookies);

		try {
			const updatedCart = await addCouponCode(cart.id, cart.version, couponCode.toString());

			return { cart: updatedCart };
		} catch (error) {
			const errorResponse = error as ClientResponse;

			if (errorResponse.body.statusCode === 400) {
				return fail(400, { error: 'Invalid coupon code' });
			}

			return fail(500, { error: 'Failed to set coupon code' });
		}
	},
	removeCouponCode: async ({ request, cookies }) => {
		const data = await request.formData();
		const couponCode = data.get('coupon-code');
		const cart = await getCartFromSession(cookies);

		const couponCodes = getCouponCodes(cart);
		const newCouponCodes = couponCodes.filter((code) => code.code !== couponCode);

		const updatedCart = await updateCouponCodes(cart.id, cart.version, newCouponCodes);

		return { cart: updatedCart };
	},
	updateItemQuantity: async ({ request, cookies }) => {
		const data = await request.formData();
		const lineItemId = data.get('line-item-id');
		const quantity = data.get('quantity');

		if (!lineItemId || !quantity) {
			return fail(400, { error: 'Missing line item ID or quantity' });
		}

		const cart = await getCartFromSession(cookies);

		try {
			const newQuantity = parseInt(quantity.toString());

			const updatedCart = await changeLineItemQuantity(
				cart.id,
				cart.version,
				lineItemId.toString(),
				newQuantity
			);

			return { cart: updatedCart };
		} catch (error) {
			return fail(500, { error: 'Failed to update item quantity' });
		}
	}
} satisfies Actions;

const getCartFromSession = async (cookies: Cookies) => {
	const cartId = cookies.get('cartId');

	if (!cartId) {
		throw new Error('No cart');
	}

	const cart = await getCart(cartId);

	if (!cart) {
		throw new Error('Cart not found');
	}

	return cart;
};
