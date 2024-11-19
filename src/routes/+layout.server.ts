import { createClient } from '$lib/CreateClient';

export const load = async () => {
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
		currentCountry: 'DE',
		currentCurrency: 'EUR'
	};
};
