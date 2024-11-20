import { createClient } from '$lib/CreateClient';
import { json, type RequestEvent } from '@sveltejs/kit';
import { getCart } from '$lib/CartService';

export async function GET({ cookies }: RequestEvent) {
	const apiRoot = createClient();
	let cartId = cookies.get('cartId');

	if (!cartId) {
		return json(null);
	}

	const cart = await getCart(cartId);

	if (cart.cartState === 'Ordered') {
		cookies.delete('cartId', { path: '/' });
		return json(null);
	}

	return json(cart);
}
