import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { getCart } from '$lib/CartService';

export async function load({ cookies }) {
	const cartId = cookies.get('cartId');

	if (!cartId || !(await getCart(cartId))) {
		redirect(307, '/cart');
	}

	const accessToken = await getAccessToken();
	const sessionId = await getSessionId(accessToken, cartId);

	return {
		sessionId,
		projectKey: env.CTP_PROJECT_KEY!,
		region: env.CTP_REGION!
	};
}

const getAccessToken = async () => {
	const basicAuth = Buffer.from(`${env.CTP_CLIENT_ID}:${env.CTP_CLIENT_SECRET}`).toString('base64');
	const body = `grant_type=client_credentials${env.CTP_SCOPES ? `&scope=${env.CTP_SCOPES}` : ''}`;

	const tokenResponse = await fetch(
		`https://auth.${env.CTP_REGION}.commercetools.com/oauth/token`,
		{
			method: 'POST',
			headers: {
				Authorization: `Basic ${basicAuth}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body
		}
	);

	if (!tokenResponse.ok) {
		throw new Error('Failed to get token ' + tokenResponse.status);
	}

	const tokenJson = await tokenResponse.json();
	const accessToken = tokenJson.access_token;
	return accessToken;
};

const getSessionId = async (accessToken: string, cartId: string) => {
	const sessionUrl =
		'https://session.' + env.CTP_REGION + '.commercetools.com/' + env.CTP_PROJECT_KEY + '/sessions';

	const sessionResponse = await fetch(sessionUrl, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			cart: {
				cartRef: {
					id: cartId
				}
			},
			metadata: { applicationKey: env.CTP_CHECKOUT_APPLICATION_KEY }
		})
	});

	if (!sessionResponse.ok) {
		throw new Error('Failed to create session ' + sessionResponse.status);
	}

	return (await sessionResponse.json()).id;
};
