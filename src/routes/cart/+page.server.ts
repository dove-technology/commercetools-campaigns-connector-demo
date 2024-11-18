import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { createClient } from '$lib/CreateClient';
import { type RequestEvent } from '@sveltejs/kit';

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
