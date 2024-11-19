import { createClient } from '$lib/CreateClient';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET({ cookies }: RequestEvent) {
	const apiRoot = createClient();
	let cartId = cookies.get('cartId');

	if (!cartId) {
		return json(null);
	}

	const result = await apiRoot.carts().withId({ ID: cartId }).get().execute();

	if (result.body.cartState === 'Ordered') {
		cookies.delete('cartId', { path: '/' });
		return json(null);
	}

	return json(result.body);
}
