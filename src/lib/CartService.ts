import { createClient } from '$lib/CreateClient';

export async function getCart(cartId: string) {
	const apiRoot = createClient();

	const result = await apiRoot.carts().withId({ ID: cartId }).get().execute();

	return result.body;
}
