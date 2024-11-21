import { createClient } from '$lib/CreateClient';
import { json, type RequestEvent } from '@sveltejs/kit';
import { getCart, updateCouponCodes } from '$lib/CartService';
import { getCouponCodes } from '$lib/CartHelpers';

export async function DELETE({ request, cookies }: RequestEvent) {
	const apiRoot = createClient();
	const { couponCode } = await request.json();
	let cartId = cookies.get('cartId');

	if (!cartId) {
		return json({ error: 'Cart not found' }, { status: 404 });
	}

	const cart = await getCart(cartId);

	if (!cart) {
		throw new Error('Cart not found');
	}

	const cartVersion = cart.version;

	const couponCodes = getCouponCodes(cart);
	const newCouponCodes = couponCodes.filter((code) => code.code !== couponCode);

	const updatedCart = await updateCouponCodes(cartId, cartVersion, newCouponCodes);

	return json(updatedCart);
}
