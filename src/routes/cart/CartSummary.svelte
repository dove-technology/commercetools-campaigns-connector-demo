<script lang="ts">
	import { goto } from '$app/navigation';
	import { getCartDiscountAmount, getCartSubtotal } from '$lib/CartHelpers';
	import { formatCurrencyMinorUnits, formatMoney } from '$lib/CurrencyDisplay';
	import CartCouponCodes from './CartCouponCodes.svelte';
	import AddCouponCode from './AddCouponCode.svelte';
	import { page } from '$app/stores';

	let { cart, form } = $props();

	let cartSubtotal = $derived(getCartSubtotal(cart));
	let cartDiscountAmount = $derived(getCartDiscountAmount(cart));
</script>

<section
	aria-labelledby="summary-heading"
	class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
>
	<div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
		<h2 id="summary-heading" class="font-meddeleteItemt-gray-900 text-lg">Order summary</h2>

		<dl class="mt-6 space-y-4">
			<div class="flex items-center justify-between">
				<dt class="text-sm text-gray-600">Subtotal</dt>
				<dd class="text-sm font-medium text-gray-900">
					{formatCurrencyMinorUnits(
						cartSubtotal,
						$page.data.cartCurrencyFractionDigits,
						$page.data.cartCurrencyCode,
						$page.data.currentLanguage
					)}
				</dd>
			</div>

			{#if cartDiscountAmount > 0}
				<div class="flex items-center justify-between text-green-700">
					<dt class="text-sm">Discount</dt>
					<dd class="text-sm font-medium">
						-{formatCurrencyMinorUnits(
							cartDiscountAmount,
							$page.data.cartCurrencyFractionDigits,
							$page.data.cartCurrencyCode,
							$page.data.currentLanguage
						)}
					</dd>
				</div>
			{/if}

			<div class="flex items-center justify-between border-t border-gray-200 pt-4">
				<dt class="flex items-center text-sm text-gray-600">
					<span>Shipping cost</span>
				</dt>
				<dd class="text-sm font-medium text-gray-900">
					{cart.shippingInfo?.price
						? formatMoney(cart.shippingInfo.price, $page.data.currentLanguage)
						: 'Calculated later'}
				</dd>
			</div>

			{#if cart.shippingInfo?.discountedPrice}
				<div class="flex items-center justify-between border-t border-gray-200 pt-4 text-green-700">
					<dt class="flex items-center text-sm">
						<span>Shipping discount</span>
					</dt>
					<dd class="text-sm font-medium">
						-{cart.shippingInfo?.price
							? formatMoney(cart.shippingInfo.discountedPrice.value, $page.data.currentLanguage)
							: '-'}
					</dd>
				</div>
			{/if}

			<div class="flex items-center justify-between border-t border-gray-200 pt-4">
				<dt class="text-base font-medium text-gray-900">Order total</dt>
				<dd class="text-base font-medium text-gray-900">
					{cart.totalPrice ? formatMoney(cart.totalPrice, $page.data.currentLanguage) : '-'}
				</dd>
			</div>
		</dl>

		<div class="mt-6">
			<button
				type="button"
				class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
				onclick={() => goto('/checkout')}>Checkout</button
			>
		</div>
	</div>
	<div class="mt-4 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
		<CartCouponCodes {cart} />
		<AddCouponCode {form} />
	</div>
</section>
