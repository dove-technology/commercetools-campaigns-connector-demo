import { createClient } from '$lib/CreateClient';
import { json, type Cookies, type RequestEvent } from '@sveltejs/kit';
import { getCurrency, getCountry } from '$lib/ProjectSettings.js';
import {
	getCart,
	createCart,
	addLineItem,
	removeLineItem,
	changeLineItemQuantity
} from '$lib/CartService';
import type { Cart } from '@commercetools/platform-sdk';

export async function POST({ request, cookies }: RequestEvent) {
	const { sku } = await request.json();

	let cartId = cookies.get('cartId');

	let cart: Cart | undefined;

	if (!cartId) {
		cart = await createCartAndSetCookie(cookies);
	} else {
		cart = await getCart(cartId);

		// handle the cart not being valid even though we have an ID
		if (!cart) {
			cart = await createCartAndSetCookie(cookies);
		}
	}

	const cartVersion = cart.version;

	const updatedCart = await addLineItem(cart.id, cartVersion, sku);

	return json(updatedCart);
}

export async function DELETE({ request, cookies }: RequestEvent) {
	const apiRoot = createClient();
	const { lineItemId } = await request.json();
	let cartId = cookies.get('cartId');

	if (!cartId) {
		return json({ error: 'Cart not found' }, { status: 404 });
	}

	const cart = await getCart(cartId);

	if (!cart) {
		throw new Error('Cart not found');
	}
	const cartVersion = cart.version;

	const updatedCart = await removeLineItem(cartId, cartVersion, lineItemId);

	return json(updatedCart);
}

const createCartAndSetCookie = async (cookies: Cookies) => {
	const cart = await createCart(getCurrency(cookies), getCountry(cookies));

	cookies.set('cartId', cart.id, { path: '/' });

	return cart;
};
