import type { PageServerLoad, Actions } from './$types';
import { createClient } from '$lib/CreateClient';
import { fail, type RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }: RequestEvent) => {
	const apiRoot = createClient();
	let cartId = cookies.get('cartId');

	if (!cartId) {
		return {
			cart: undefined
		};
	}

	const result = await apiRoot.carts().withId({ ID: cartId }).get().execute();

	if (result.body.cartState === 'Ordered') {
		throw new Error('Cart is already ordered');
	}

	return {
		cart: result.body
	};
};

export const actions = {
	addCouponCode: async ({ request, cookies }) => {
		const data = await request.formData();
		const couponCode = data.get('coupon-code');

		if (!couponCode) {
			return fail(400, { error: 'Enter a code' });
		}

		if (couponCode === 'InvalidTestCode') {
			return fail(400, { 'coupon-code': couponCode, error: 'Invalid coupon code' });
		}

		const apiRoot = createClient();
		const cartId = cookies.get('cartId');

		if (!cartId) {
			throw new Error('No cart');
		}

		try {
			const result = await apiRoot.carts().withId({ ID: cartId }).get().execute();

			let serialisedValue = JSON.stringify({
				type: 'addCouponCode',
				code: couponCode
			});

			const response = await apiRoot
				.carts()
				.withId({ ID: cartId })
				.post({
					body: {
						version: result.body.version,
						actions: [
							{
								action: 'setCustomField',
								name: 'dovetech-discounts-cartAction',
								value: serialisedValue
							}
						]
					}
				})
				.execute();

			return { success: true, cart: response.body };
		} catch (error) {
			// @ts-expect-error
			if (error.body.statusCode === 400) {
				return fail(400, { error: 'Invalid coupon code' });
			}

			return fail(500, { error: 'Failed to set coupon code' });
		}
	}
} satisfies Actions;
