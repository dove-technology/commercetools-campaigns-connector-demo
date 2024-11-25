import type { Cart } from '@commercetools/platform-sdk';

const state = $state({
	cart: undefined as Cart | undefined
});

export const getCart = () => {
	return state.cart;
};

export const getState = () => {
	return state;
};

export const setCart = (cart: Cart | undefined) => {
	state.cart = cart;
};
