import { it, expect } from 'vitest';
import { getCartDiscountAmount, getLineItemSubtotal, getLineItemTotal } from './CartHelpers';
import type { Cart } from '@commercetools/platform-sdk';
import * as cartWithProductDiscount from './test-carts/cart-with-product-discount.json';
import * as cartWithLineItemDiscounts from './test-carts/cart-with-line-item-discounts.json';
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

it('line item total should return total', () => {
	const cart = cartWithNoDiscounts as Cart;

	const lineItem = cart.lineItems[0];
	const total = getLineItemTotal(lineItem);

	expect(total).toBe(598);
});

it('line item total should take into account price per quantity', () => {
	const cart = cartWithLineItemDiscounts as Cart;

	const lineItem = cart.lineItems[0];
	const total = getLineItemTotal(lineItem);

	expect(total).toBe(598);
});

it('get cart discount amount should return 0 when no discounts', () => {
	const cart = cartWithNoDiscounts as Cart;

	const discountAmount = getCartDiscountAmount(cart);

	expect(discountAmount).toBe(0);
});

it('get cart discount amount should return amount when cart has discounts', () => {
	const cart = cartWithLineItemDiscounts as Cart;

	const discountAmount = getCartDiscountAmount(cart);

	expect(discountAmount).toBe(299);
});
