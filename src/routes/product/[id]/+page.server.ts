import type { PageServerLoad } from './$types';
import { createClient } from '$lib/CreateClient';

export const load: PageServerLoad = async ({ params }) => {
	const productId = params.id;

	const result = await createClient()
		.productProjections()
		.withId({ ID: productId })

		.get({
			queryArgs: {
				priceCurrency: 'EUR',
				priceCountry: 'DE'
			}
		})
		.execute();

	return {
		product: result.body
	};
};
