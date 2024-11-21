import type { PageServerLoad, Actions } from './$types';
import { createClient } from '$lib/CreateClient';
import { getCurrency, getCountry } from '$lib/ProjectSettings.js';
import { getCart, createCart, addLineItem } from '$lib/CartService';
import { fail, type Cookies } from '@sveltejs/kit';
import type { ClientResponse } from '@commercetools/ts-client';
import { getCustomer } from '$lib/CustomerService';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const productId = params.id;

	const result = await createClient()
		.productProjections()
		.withId({ ID: productId })
		.get({
			queryArgs: {
				priceCurrency: getCurrency(cookies),
				priceCountry: getCountry(cookies)
			}
		})
		.execute();

	return {
		product: result.body
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const sku = formData.get('sku') as string;

		const cartId = cookies.get('cartId');
		let cart;

		if (!cartId) {
			cart = await createCartAndSetCookie(cookies);
		} else {
			cart = await getCart(cartId);

			// handle the cart not being valid even though we have an ID
			if (!cart) {
				cart = await createCartAndSetCookie(cookies);
			}
		}

		try {
			const updatedCart = await addLineItem(cart.id, cart.version, sku);

			return {
				cart: updatedCart
			};
		} catch (error) {
			console.error(error);

			const errorResponse = error as ClientResponse;

			if (errorResponse.body.statusCode === 400) {
				return fail(400, { addToCartError: errorResponse.body.message });
			}

			return fail(500, { addToCartError: 'Failed to add item to cart' });
		}
	}
};

const createCartAndSetCookie = async (cookies: Cookies) => {
	const customerIdCookie = cookies.get('customerId');

	let customerId;
	let customerEmail;

	// if we have a customer ID, set the customer on the cart
	if (customerIdCookie) {
		const customer = await getCustomer(customerIdCookie);
		customerId = customer.id;
		customerEmail = customer.email;
	}

	const cart = await createCart(
		getCurrency(cookies),
		getCountry(cookies),
		customerId,
		customerEmail
	);

	cookies.set('cartId', cart.id, { path: '/' });

	return cart;
};
