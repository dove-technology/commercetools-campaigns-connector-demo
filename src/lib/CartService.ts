import { createClient } from '$lib/CreateClient';
import type { ClientResponse } from '@commercetools/ts-client';

export async function createCart(
	currency: string,
	country: string,
	customerId?: string,
	customerEmail?: string
) {
	const apiRoot = createClient();
	const response = await apiRoot
		.carts()
		.post({
			body: {
				currency,
				country,
				customerId,
				customerEmail
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

		throw error;
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
						name: 'dovetech-discounts-cart-action',
						value: serialisedValue
					}
				]
			}
		})
		.execute();

	return result.body;
}

export async function updateCouponCodes(
	cartId: string,
	cartVersion: number,
	couponCodes: string[]
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
						action: 'setCustomField',
						name: 'dovetech-discounts-coupon-codes',
						value: couponCodes
					}
				]
			}
		})
		.execute();

	return result.body;
}

export async function setCustomer(
	cartId: string,
	cartVersion: number,
	customerId: string | undefined,
	customerEmail: string | undefined
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
						action: 'setCustomerId',
						customerId: customerId
					},
					{
						action: 'setCustomerEmail',
						email: customerEmail
					}
				]
			}
		})
		.execute();

	return result.body;
}
