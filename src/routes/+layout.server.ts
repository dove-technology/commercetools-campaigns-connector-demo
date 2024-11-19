import { createClient } from '$lib/CreateClient';
import { getCurrency, getCountry } from '$lib/ProjectSettings.js';

export const load = async ({ cookies }) => {
	const result = await createClient()
		.categories()
		.get({
			queryArgs: {
				where: 'ancestors is empty'
			}
		})
		.execute();

	return {
		categories: result.body.results,
		currentCurrency: getCurrency(cookies),
		currentCountry: getCountry(cookies),
		currentLanguage: 'en-GB'
	};
};
