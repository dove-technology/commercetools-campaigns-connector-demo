import { createClient } from '$lib/CreateClient';
import { getCurrency, getCountry } from '$lib/ProjectSettings.js';

export const load = async ({ params, cookies, url }) => {
	const categoryId = params.categoryId;

	const pageParam = url.searchParams.get('page');

	const pageSize = 20;
	const page = pageParam && !isNaN(parseInt(pageParam)) ? parseInt(pageParam) : 1;
	const offset = page <= 1 ? 0 : (page - 1) * pageSize;

	const result = await createClient()
		.productProjections()
		.search()
		.get({
			queryArgs: {
				priceCurrency: getCurrency(cookies),
				priceCountry: getCountry(cookies),
				filter: `categories.id:"${categoryId}"`,
				offset: offset,
				limit: pageSize,
				withTotal: true
			}
		})
		.execute();

	let totalPages;

	if (result.body.total && result.body.total > 0) {
		totalPages = Math.ceil(result.body.total / pageSize);
	}

	return {
		page,
		totalPages,
		products: result.body.results
	};
};
