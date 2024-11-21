import type { Actions } from './$types';
import { getCart, setCustomer } from '$lib/CartService';
import { createClient } from '$lib/CreateClient';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		const cartId = cookies.get('cartId');
		const cart = await getCart(cartId!);

		if (!email) {
			return { error: 'Missing required fields' };
		}

		if (!cart) {
			return { error: 'Cart not found' };
		}

		const apiRoot = createClient();

		const result = await apiRoot
			.customers()
			.get({
				queryArgs: {
					where: `email="${email}"`
				}
			})
			.execute();

		if (result.body.results.length !== 1) {
			return fail(400, { error: 'Customer not found' });
		}

		const customer = result.body.results[0];
		console.log(customer);

		try {
			const updatedCart = await setCustomer(cart.id, cart.version, customer.id, customer.email);
			return { cart: updatedCart };
		} catch (error) {
			return { error: 'Failed to set customer ID' };
		}
	}
};
