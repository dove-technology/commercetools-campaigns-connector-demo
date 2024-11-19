import { createClient } from '$lib/CreateClient';
import { getCurrency, getCountry } from '$lib/ProjectSettings.js';

export const load = async ({ cookies }) => {
	const ctClient = createClient();

	const project = await ctClient.get().execute();

	const result = await ctClient
		.categories()
		.get({
			queryArgs: {
				where: 'ancestors is empty'
			}
		})
		.execute();

	return {
		categories: result.body.results,
		countries: project.body.countries,
		currencies: project.body.currencies,
		currentCurrency: getCurrency(cookies),
		currentCountry: getCountry(cookies)
	};
};
