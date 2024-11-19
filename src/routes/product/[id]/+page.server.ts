import type { PageServerLoad } from './$types';
import { createClient } from '$lib/CreateClient';
import { getCurrency, getCountry } from '$lib/ProjectSettings.js';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const productId = params.id;

	const result = await createClient()
		.productProjections()
		.withId({ ID: productId })

		.get({
			queryArgs: {
				priceCurrency: getCurrency(cookies),
				priceCountry: getCountry(cookies)
			}
		})
		.execute();

	return {
		product: result.body
	};
};
