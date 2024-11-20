import { createClient } from '$lib/CreateClient';
import { json, type RequestEvent } from '@sveltejs/kit';
import { getCurrency, getCountry } from '$lib/ProjectSettings.js';
import { getCart } from '$lib/CartService';

export async function POST({ request, cookies }: RequestEvent) {
	const apiRoot = createClient();
	const { sku } = await request.json();
	let cartId = cookies.get('cartId');

	if (!cartId) {
		const cartResponse = await apiRoot
			.carts()
			.post({
				body: {
					currency: getCurrency(cookies),
					country: getCountry(cookies)
				}
			})
			.execute();
		cartId = cartResponse.body.id;
		cookies.set('cartId', cartId, { path: '/' });
	}

	const cartResponse = await getCart(cartId);
	const cartVersion = cartResponse.version;

	const result = await apiRoot
		.carts()
		.withId({ ID: cartId })
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

	const cartResponse = await getCart(cartId);
	const cartVersion = cartResponse.version;

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

	const cartResponse = await getCart(cartId);
	const cartVersion = cartResponse.version;

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
