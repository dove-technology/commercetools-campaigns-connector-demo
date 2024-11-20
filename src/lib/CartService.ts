import { createClient } from '$lib/CreateClient';
import type { ClientResponse } from '@commercetools/ts-client';

export async function getCart(cartId: string) {
	const apiRoot = createClient();

	try {
		const result = await apiRoot.carts().withId({ ID: cartId }).get().execute();

		if (result.body.cartState !== 'Active') {
			console.error('Cart is not in an active state so cannot be used');
			return undefined;
		}

		return result.body;
	} catch (error) {
		const errorResponse = error as ClientResponse;

		if (errorResponse.statusCode === 404) {
			return undefined;
		}
	}
}
