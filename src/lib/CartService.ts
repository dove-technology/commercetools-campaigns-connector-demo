import { createClient } from '$lib/CreateClient';
import type { ClientResponse } from '@commercetools/ts-client';

export async function createCart(currency: string, country: string) {
	const apiRoot = createClient();
	const response = await apiRoot
		.carts()
		.post({
			body: {
				currency,
				country
			}
		})
		.execute();

	return response.body;
}

export async function getCart(cartId: string) {
	const apiRoot = createClient();

	try {
		const response = await apiRoot.carts().withId({ ID: cartId }).get().execute();

		if (response.body.cartState !== 'Active') {
			console.error('Cart is not in an active state so cannot be used');
			return undefined;
		}

		return response.body;
	} catch (error) {
		const errorResponse = error as ClientResponse;

		if (errorResponse.statusCode === 404) {
			return undefined;
		}
	}
}

export async function addLineItem(
	cartId: string,
	cartVersion: number,
	sku: string,
	quantity: number = 1
) {
	const apiRoot = createClient();

	const result = await apiRoot
		.carts()
		.withId({ ID: cartId })
		.post({
			body: {
				version: cartVersion,
				actions: [
					{
						action: 'addLineItem',
						sku,
						quantity
					}
				]
			}
		})
		.execute();

	return result.body;
}

export async function removeLineItem(cartId: string, cartVersion: number, lineItemId: string) {
	const apiRoot = createClient();

	const result = await apiRoot
		.carts()
		.withId({ ID: cartId })
		.post({
			body: {
				version: cartVersion,
				actions: [
					{
						action: 'removeLineItem',
						lineItemId: lineItemId
					}
				]
			}
		})
		.execute();

	return result.body;
}

export async function changeLineItemQuantity(
	cartId: string,
	cartVersion: number,
	lineItemId: string,
	quantity: number
) {
	const apiRoot = createClient();

	const result = await apiRoot
		.carts()
		.withId({ ID: cartId })
		.post({
			body: {
				version: cartVersion,
				actions: [
					{
						action: 'changeLineItemQuantity',
						lineItemId: lineItemId,
						quantity: quantity
					}
				]
			}
		})
		.execute();

	return result.body;
}

export async function addCouponCode(cartId: string, cartVersion: number, couponCode: string) {
	const apiRoot = createClient();

	const serialisedValue = JSON.stringify({
		type: 'addCouponCode',
		code: couponCode
	});

	const result = await apiRoot
		.carts()
		.withId({ ID: cartId })
		.post({
			body: {
				version: cartVersion,
				actions: [
					{
						action: 'setCustomField',
						name: 'dovetech-discounts-cartAction',
						value: serialisedValue
					}
				]
			}
		})
		.execute();

	return result.body;
}
