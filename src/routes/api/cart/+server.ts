import { json, type RequestEvent } from '@sveltejs/kit';
import { getCart } from '$lib/CartService';

export async function GET({ cookies }: RequestEvent) {
	let cartId = cookies.get('cartId');

	if (!cartId) {
		return json(null);
	}

	const cart = await getCart(cartId);

	return json(cart);
}
