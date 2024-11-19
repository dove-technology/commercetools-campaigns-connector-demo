import { env } from '$env/dynamic/private';
import { createClient } from '$lib/CreateClient';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const apiRoot = createClient();
	const cartId = cookies.get('cartId');

	if (!cartId) {
		redirect(307, '/cart');
	}

	try {
		const result = await apiRoot.carts().withId({ ID: cartId }).get().execute();

		if (result.body.cartState === 'Ordered') {
			redirect(307, '/cart');
		}
	} catch (error) {
		redirect(307, '/cart');
	}

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

	console.log(tokenResponse.status);

	if (!tokenResponse.ok) {
		throw new Error('Failed to get token ' + tokenResponse.status);
	}

	const tokenJson = await tokenResponse.json();
	const accessToken = tokenJson.access_token;

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
			metadata: { applicationKey: 'demo-commercetools-checkout-taxes' }
		})
	});

	if (!sessionResponse.ok) {
		throw new Error('Failed to create session ' + sessionResponse.status);
	}

	const sessionJson = await sessionResponse.json();

	console.log(sessionJson);

	if (sessionJson?.id) {
		return sessionJson;
	}
}
