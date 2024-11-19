import type { Cookies } from '@sveltejs/kit';

export const getCurrency = (cookies: Cookies) => {
	return cookies.get('currency') ?? 'EUR';
};

export const getCountry = (cookies: Cookies) => {
	return cookies.get('country') ?? 'DE';
};

export const setCurrency = (cookies: Cookies, currency: string) => {
	cookies.set('currency', currency, { path: '/' });
};

export const setCountry = (cookies: Cookies, country: string) => {
	cookies.set('country', country, { path: '/' });
};
