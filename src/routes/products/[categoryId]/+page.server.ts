import { createClient } from '$lib/CreateClient';

export const load = async ({ params }) => {
	const categoryId = params.categoryId;

	const result = await createClient()
		.productProjections()
		.search()
		.get({
			queryArgs: {
				priceCurrency: 'EUR',
				priceCountry: 'DE',
				filter: `categories.id:"${categoryId}"`
			}
		})
		.execute();

	return {
		products: result.body.results
	};
};
