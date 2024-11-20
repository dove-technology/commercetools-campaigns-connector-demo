import { createClient } from '$lib/CreateClient';
import { json, type Cookies, type RequestEvent } from '@sveltejs/kit';
import { getCurrency, getCountry } from '$lib/ProjectSettings.js';
import { getCart } from '$lib/CartService';
import type { Cart } from '@commercetools/platform-sdk';

export async function POST({ request, cookies }: RequestEvent) {
	const apiRoot = createClient();
	const { sku } = await request.json();
	let cartId = cookies.get('cartId');

	let cart: Cart | undefined;

	if (!cartId) {
		cart = await createCart(cookies);
	} else {
		cart = await getCart(cartId);

		// handle the cart not being valid
		if (!cart) {
			cart = await createCart(cookies);
		}
	}

	const cartVersion = cart.version;

	const result = await apiRoot
		.carts()
		.withId({ ID: cart.id })
		.post({
			body: {
				version: cartVersion,
				actions: [
					{
						action: 'addLineItem',
						sku: sku,
						quantity: 1
					}
				]
			}
		})
		.execute();

	return json(result.body);
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

	const result = await apiRoot
		.carts()
		.withId({ ID: cartId })
		.post({
			body: {
				version: cartVersion,
				actions: [
					{
						action: 'removeLineItem',
						lineItemId: lineItemId
					}
				]
			}
		})
		.execute();

	return json(result.body);
}

export async function PUT({ request, cookies }: RequestEvent) {
	const apiRoot = createClient();
	const { lineItemId, quantity } = await request.json();
	let cartId = cookies.get('cartId');

	if (!cartId) {
		return json({ error: 'Cart not found' }, { status: 404 });
	}

	const cart = await getCart(cartId);

	if (!cart) {
		throw new Error('Cart not found');
	}

	const cartVersion = cart.version;

	const result = await apiRoot
		.carts()
		.withId({ ID: cartId })
		.post({
			body: {
				version: cartVersion,
				actions: [
					{
						action: 'changeLineItemQuantity',
						lineItemId: lineItemId,
						quantity: quantity
					}
				]
			}
		})
		.execute();

	return json(result.body);
}

const createCart = async (cookies: Cookies) => {
	const apiRoot = createClient();
	const cartResponse = await apiRoot
		.carts()
		.post({
			body: {
				currency: getCurrency(cookies),
				country: getCountry(cookies)
			}
		})
		.execute();

	const cart = cartResponse.body;

	cookies.set('cartId', cart.id, { path: '/' });

	return cart;
};
