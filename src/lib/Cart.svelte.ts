import type { Cart } from '@commercetools/platform-sdk';

let state = $state({
	count: 2,
	cart: undefined as Cart | undefined
});

export const getCartCount = () => {
	return state.count;
};

export const increment = () => {
	state.count += 1;
};

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

export const removeItem = async (lineItemId: string) => {
	const response = await fetch('/api/cart/items', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ lineItemId })
	});

	if (response.ok) {
		state.cart = await response.json();
	} else {
		console.error('Failed to remove item from cart');
	}
};

export const getCart = () => {
	return state.cart;
};
