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
	addCouponCode: async ({ request }) => {
		const data = await request.formData();
		const couponCode = data.get('coupon-code');

		if (!couponCode) {
			return fail(400, { 'coupon-code': couponCode, missing: true });
		}

		if (couponCode === 'InvalidTestCode') {
			return fail(400, { 'coupon-code': couponCode, incorrect: true });
		}

		return { success: true };
	}
} satisfies Actions;
