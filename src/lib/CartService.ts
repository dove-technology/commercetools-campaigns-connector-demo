import { createClient } from '$lib/CreateClient';
import type { ClientResponse } from '@commercetools/ts-client';

export async function createCart(currency: string, country: string) {
	const apiRoot = createClient();
	const response = await apiRoot
		.carts()
		.post({
			body: {
				currency,
				country
			}
		})
		.execute();

	return response.body;
}

export async function getCart(cartId: string) {
	const apiRoot = createClient();

	try {
		const response = await apiRoot.carts().withId({ ID: cartId }).get().execute();

		if (response.body.cartState !== 'Active') {
			console.error('Cart is not in an active state so cannot be used');
			return undefined;
		}

		return response.body;
	} catch (error) {
		const errorResponse = error as ClientResponse;

		if (errorResponse.statusCode === 404) {
			return undefined;
		}
	}
}
