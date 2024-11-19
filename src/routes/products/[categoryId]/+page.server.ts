import { createClient } from '$lib/CreateClient';
import { getCurrency, getCountry } from '$lib/ProjectSettings.js';

export const load = async ({ params, cookies }) => {
	const categoryId = params.categoryId;

	const result = await createClient()
		.productProjections()
		.search()
		.get({
			queryArgs: {
				priceCurrency: getCurrency(cookies),
				priceCountry: getCountry(cookies),
				filter: `categories.id:"${categoryId}"`
			}
		})
		.execute();

	return {
		products: result.body.results
	};
};
