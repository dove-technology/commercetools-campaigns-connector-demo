import type { Actions } from './$types';
import { getCart, setCustomer } from '$lib/CartService';
import { createClient } from '$lib/CreateClient';
import { fail } from '@sveltejs/kit';
import { getCustomer } from '$lib/CustomerService';

export const load = async ({ cookies }) => {
	const customerId = cookies.get('customerId');

	if (!customerId) {
		return { customer: null };
	}

	const customer = await getCustomer(customerId);

	return { customer };
};

export const actions: Actions = {
	clearCustomer: async ({ cookies }) => {
		cookies.delete('customerId', { path: '/' });

		const cartId = cookies.get('cartId');

		if (!cartId) {
			return { cart: undefined };
		}

		const cart = await getCart(cartId);

		if (!cart) {
			return { cart: undefined };
		}

		try {
			const updatedCart = await setCustomer(cart.id, cart.version, undefined, undefined);

			return { cart: updatedCart };
		} catch (error) {
			console.error(error);
			return fail(500, { clearCustomerError: 'Failed to clear customer on cart' });
		}
	},
	setCustomer: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!email) {
			return { setCustomerError: 'Enter an email' };
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
			return fail(400, {
				setCustomerError:
					'Customer not found. Find a valid customer in the commercetools Merchant Center'
			});
		}

		const customer = result.body.results[0];

		cookies.set('customerId', customer.id, { path: '/' });

		const cartId = cookies.get('cartId');

		if (!cartId) {
			return { cart: undefined };
		}

		const cart = await getCart(cartId);

		if (!cart) {
			return { cart: undefined };
		}

		try {
			const updatedCart = await setCustomer(cart.id, cart.version, customer.id, customer.email);
			return { cart: updatedCart };
		} catch (error) {
			console.error(error);
			return fail(500, { setCustomerError: 'Failed to set customer on cart' });
		}
	}
};
