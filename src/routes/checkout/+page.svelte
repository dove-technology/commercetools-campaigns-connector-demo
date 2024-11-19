<script>
	import { checkoutFlow } from '@commercetools/checkout-browser-sdk';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		checkoutFlow({
			projectKey: 'smu-test',
			region: 'europe-west1.gcp',
			sessionId: data.id,
			locale: `en`,
			logInfo: true,
			logWarn: true,
			logError: true,
			onInfo: (message) => {
				if (message.code === 'checkout_completed') {
					// @ts-expect-error
					const id = message.payload.order.id;

					goto(`/orderconfirmation?orderId=${id}`);
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
