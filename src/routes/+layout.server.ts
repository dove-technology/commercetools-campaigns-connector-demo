import { createClient } from '$lib/CreateClient';

export const load = async () => {
	const result = await createClient()
		.categories()
		.get({
			queryArgs: {
				where: 'ancestors is empty'
			}
		})
		.execute();

	return {
		categories: result.body.results
	};
};
