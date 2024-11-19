<script>
	import { checkoutFlow } from '@commercetools/checkout-browser-sdk';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		checkoutFlow({
			projectKey: data.projectKey,
			region: data.region,
			sessionId: data.sessionId,
			locale: `en`,
			logInfo: true,
			logWarn: true,
			logError: true,
			onInfo: (message) => {
				switch (message.code) {
					case 'checkout_completed':
						// @ts-expect-error
						const id = message.payload.order.id;
						goto(`/orderconfirmation?orderId=${id}`);
						break;
					case 'checkout_cancelled':
						goto(`/cart`);
						break;
					default:
						break;
				}
			},
			onWarn: (message) => {
				console.warn(message);
			},
			onError: (message) => {
				console.error(message);
			}
		});
	});
</script>

<p>Loading...</p>
