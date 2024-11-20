import { createClient } from '$lib/CreateClient';
import type { CartCouponCode } from '$lib/types/DovetechCouponCodes';
import type { Cart } from '@commercetools/platform-sdk';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function DELETE({ request, cookies }: RequestEvent) {
	const apiRoot = createClient();
	const { couponCode } = await request.json();
	let cartId = cookies.get('cartId');

	if (!cartId) {
		return json({ error: 'Cart not found' }, { status: 404 });
	}

	const cartResponse = await apiRoot.carts().withId({ ID: cartId }).get().execute();
	const cartVersion = cartResponse.body.version;

	const couponCodes = getCouponCodes(cartResponse.body);
	const newCouponCodes = couponCodes.filter((code) => code.code !== couponCode);
	const serialisedValue = JSON.stringify(newCouponCodes);

	const result = await apiRoot
		.carts()
		.withId({ ID: cartId })
		.post({
			body: {
				version: cartVersion,
				actions: [
					{
						action: 'setCustomField',
						name: 'dovetech-discounts-couponCodes',
						value: serialisedValue
					}
				]
			}
		})
		.execute();

	return json(result.body);
}

const getCouponCodes = (cart: Cart): CartCouponCode[] => {
	let serialisedCodes = cart.custom?.fields['dovetech-discounts-couponCodes'] ?? '';

	if (serialisedCodes) {
		return JSON.parse(serialisedCodes);
	}

	return [];
};
