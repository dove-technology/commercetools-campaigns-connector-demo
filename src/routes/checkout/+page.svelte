<script lang="ts">
	import { checkoutFlow } from '@commercetools/checkout-browser-sdk';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { setCart } from '$lib/Cart.svelte';

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
					case 'checkout_completed': {
						setCart(undefined);
						const id = (message.payload as { order: { id: string } }).order.id;
						goto(`/order-confirmation?orderId=${id}`);
						break;
					}
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
