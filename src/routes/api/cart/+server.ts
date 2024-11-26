import { json, type RequestEvent } from '@sveltejs/kit';
import { getCart } from '$lib/CartService';

export async function GET({ cookies }: RequestEvent) {
	const cartId = cookies.get('cartId');

	if (!cartId) {
		return json({
			cart: undefined
		});
	}

	const cart = await getCart(cartId);

	return json({
		cart
	});
}
