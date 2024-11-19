import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { setCountry } from '$lib/ProjectSettings';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const country = data.get('country');

		if (!country) {
			return fail(400);
		}

		setCountry(cookies, country.toString());

		redirect(303, '/');
	}
} satisfies Actions;
