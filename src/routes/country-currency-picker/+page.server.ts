import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { createClient } from '$lib/CreateClient';
import { getCurrency, getCountry, setCountry, setCurrency } from '$lib/ProjectSettings.js';

export const load: PageServerLoad = async ({ cookies }) => {
	const result = await createClient().get().execute();

	return {
		countries: result.body.countries,
		currencies: result.body.currencies,
		currentCurrency: getCurrency(cookies),
		currentCountry: getCountry(cookies)
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const newCurrency = data.get('currency');
		const newCountry = data.get('country');

		if (!newCurrency || !newCountry) {
			return fail(400);
		}

		const cartId = cookies.get('cartId');

		if (cartId) {
			cookies.delete('cartId', { path: '/' });
		}

		setCurrency(cookies, newCurrency.toString());
		setCountry(cookies, newCountry.toString());

		redirect(303, '/');
	}
} satisfies Actions;
