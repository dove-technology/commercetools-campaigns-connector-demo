<script lang="ts">
	import type { Cart } from '@commercetools/platform-sdk';
	import type { CartCouponCode } from '$lib/types/DovetechCouponCodes';

	let { cart }: { cart: Cart } = $props();

	const getCouponCodes = (): CartCouponCode[] => {
		let serialisedCodes = cart.custom?.fields['dovetech-discounts-couponCodes'] ?? '';

		if (serialisedCodes) {
			return JSON.parse(serialisedCodes);
		}

		return [];
	};

	let codes = getCouponCodes();
</script>

<ul>
	{#each codes as code}
		<li>
			{code.code}
		</li>
	{/each}
</ul>
