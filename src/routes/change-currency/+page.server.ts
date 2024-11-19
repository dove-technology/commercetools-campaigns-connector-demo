import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { setCurrency } from '$lib/ProjectSettings';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const currency = data.get('currency');

		if (!currency) {
			return fail(400);
		}

		setCurrency(cookies, currency.toString());

		redirect(303, '/');
	}
} satisfies Actions;
