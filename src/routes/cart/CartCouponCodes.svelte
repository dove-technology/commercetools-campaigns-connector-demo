<script lang="ts">
	import type { Cart } from '@commercetools/platform-sdk';
	import type { CartCouponCode } from '$lib/types/DovetechCouponCodes';
	import { removeCouponCode } from '$lib/Cart.svelte';

	let { cart }: { cart: Cart } = $props();

	const getCouponCodes = (): CartCouponCode[] => {
		let serialisedCodes = cart.custom?.fields['dovetech-discounts-couponCodes'] ?? '';

		if (serialisedCodes) {
			return JSON.parse(serialisedCodes);
		}

		return [];
	};

	let codes = $derived(getCouponCodes());
</script>

<ul class="flex flex-wrap gap-2">
	{#each codes as code}
		<li class="flex items-center text-sm font-medium">
			{code.code}
			<button
				type="button"
				onclick={() => removeCouponCode(code.code)}
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
		</li>
	{/each}
</ul>
