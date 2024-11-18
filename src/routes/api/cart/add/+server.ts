import { createClient } from '$lib/CreateClient';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function POST({ request, cookies }: RequestEvent) {
	const apiRoot = createClient();
	const { sku } = await request.json();
	let cartId = cookies.get('cartId');

	if (!cartId) {
		const cartResponse = await apiRoot
			.carts()
			.post({
				body: {
					currency: 'EUR',
					country: 'DE'
				}
			})
			.execute();
		cartId = cartResponse.body.id;
		cookies.set('cartId', cartId, { path: '/' });
	}

	const cartResponse = await apiRoot.carts().withId({ ID: cartId }).get().execute();
	const cartVersion = cartResponse.body.version;

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
