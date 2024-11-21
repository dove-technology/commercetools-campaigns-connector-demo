import type { PageServerLoad } from './$types';
import { createClient } from '$lib/CreateClient';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const apiRoot = createClient();
	const orderId = url.searchParams.get('orderId');

	if (!orderId) {
		throw new Error('Order ID is required');
	}

	cookies.delete('cartId', {
		path: '/'
	});

	const result = await apiRoot.orders().withId({ ID: orderId }).get().execute();

	return {
		order: result.body
	};
};
