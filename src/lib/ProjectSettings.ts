import type { Cookies } from '@sveltejs/kit';

export const getCurrency = (cookies: Cookies) => {
	return cookies.get('currency') ?? 'EUR';
};

export const getCountry = (cookies: Cookies) => {
	return cookies.get('country') ?? 'DE';
};
