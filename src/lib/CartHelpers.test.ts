import { it, expect } from 'vitest';
import { getLineItemSubtotal } from './CartHelpers';
import type { Cart } from '@commercetools/platform-sdk';
import * as cartWithProductDiscount from './test-carts/cart-with-product-discount.json';

import * as cartWithNoDiscounts from './test-carts/cart-with-no-discounts.json';

it('line item subtotal should take into account quantity', () => {
	const cart = cartWithNoDiscounts as Cart;

	const lineItem = cart.lineItems[0];
	const subtotal = getLineItemSubtotal(lineItem);

	expect(subtotal).toBe(598);
});

it('line item subtotal should take into account product discounts', () => {
	const ctCart = cartWithProductDiscount as Cart;

	const lineItem = ctCart.lineItems[0];
	const subtotal = getLineItemSubtotal(lineItem);

	expect(subtotal).toBe(11049);
});
