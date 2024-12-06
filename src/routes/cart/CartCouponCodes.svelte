<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Cart } from '@commercetools/platform-sdk';
	import { getCouponCodes } from '$lib/CartHelpers';
	import { setCart } from '$lib/Cart.svelte';

	let { cart }: { cart: Cart } = $props();

	let removingCode = $state(false);
	let couponCodes = $derived(getCouponCodes(cart));
</script>

<ul class="flex flex-wrap gap-2">
	{#each couponCodes as coupon}
		<li class="flex items-center text-sm font-medium">
			{coupon}
			<form
				method="POST"
				action="?/removeCouponCode"
				use:enhance={() => {
					removingCode = true;
					return async ({ update, result }) => {
						if (result.type === 'success' && result.data?.cart) {
							setCart(result.data.cart as Cart);
						}

						await update();
						removingCode = false;
					};
				}}
			>
				<input type="hidden" name="coupon-code" value={coupon} />
				<button
					type="submit"
					disabled={removingCode}
					class="inline-flex rounded-md p-0.5 text-sm font-medium text-gray-700 hover:text-gray-800"
				>
					<span class="sr-only">Remove</span>
					<svg
						class="size-5"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path
							d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
						></path>
					</svg>
				</button>
			</form>
		</li>
	{/each}
</ul>
