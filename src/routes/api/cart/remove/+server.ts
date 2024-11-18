import { createClient } from '$lib/CreateClient';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function POST({ request, cookies }: RequestEvent) {
	const apiRoot = createClient();
	const { lineItemId } = await request.json();
	let cartId = cookies.get('cartId');

	if (!cartId) {
		return json({ error: 'Cart not found' }, { status: 404 });
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
						action: 'removeLineItem',
						lineItemId: lineItemId
					}
				]
			}
		})
		.execute();

	return json(result.body);
}
