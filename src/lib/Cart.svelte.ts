import type { Cart } from '@commercetools/platform-sdk';

let state = $state({
	cart: undefined as Cart | undefined
});

export const setCart = (cart: Cart | undefined) => {
	state.cart = cart;
};

export const addItem = async (sku: string) => {
	const response = await fetch(`/api/cart/items`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ sku })
	});
	if (response.ok) {
		console.log('Product added to cart');
		state.cart = await response.json();
	} else {
		console.log('Failed to add product to cart');
	}
};

export const getCart = () => {
	return state.cart;
};
