<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatCurrencyMinorUnits } from '$lib/CurrencyDisplay';
	import { setCart } from '$lib/Cart.svelte.js';
	import type { Cart, LineItem } from '@commercetools/platform-sdk';
	import { getLineItemSubtotal, getLineItemTotal } from '$lib/CartHelpers';
	import ProductPrice from '$lib/ProductPrice.svelte';
	import { page } from '$app/stores';
	import { getImageUrl } from '$lib/ProductHelpers';

	let { lineItem, cart }: { lineItem: LineItem; cart: Cart } = $props();

	const subTotal = $derived(getLineItemSubtotal(lineItem));
	const total = $derived(getLineItemTotal(lineItem));
</script>

<li class="flex py-6 sm:py-10">
	<div class="shrink-0">
		<a
			href={`/product/${lineItem.productId}`}
			class="font-medium text-gray-700 hover:text-gray-800"
		>
			<img
				src={getImageUrl(lineItem.variant?.images)}
				alt={lineItem.key}
				class="size-24 rounded-lg object-cover sm:size-32"
			/>
		</a>
	</div>

	<div class="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
		<div>
			<div class="flex justify-between sm:grid sm:grid-cols-2">
				<div class="pr-6">
					<h3 class="text-sm">
						<a
							href={`/product/${lineItem.productId}`}
							class="font-medium text-gray-700 hover:text-gray-800"
						>
							{lineItem.name[$page.data.currentLanguage]}
						</a>
					</h3>
					<p class="mt-1 text-sm text-gray-500">
						<ProductPrice price={lineItem.price} />
					</p>
				</div>

				<p class="text-right text-sm font-medium text-gray-900">
					{#if subTotal !== total}
						<span class="line-through">
							{formatCurrencyMinorUnits(
								subTotal,
								cart.totalPrice.fractionDigits,
								cart.totalPrice.currencyCode,
								$page.data.currentLanguage
							)}
						</span>
					{/if}
					{formatCurrencyMinorUnits(
						total,
						cart.totalPrice.fractionDigits,
						cart.totalPrice.currencyCode,
						$page.data.currentLanguage
					)}
				</p>
			</div>

			<div class="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
				<form
					method="POST"
					action="?/updateItemQuantity"
					use:enhance={() => {
						return async ({ update, result }) => {
							if (result.type === 'success' && result.data?.cart) {
								setCart(result.data.cart as Cart);
							}

							await update();
						};
					}}
				>
					<input type="hidden" name="line-item-id" value={lineItem.id} />
					<label for="quantity-{lineItem.id}" class="sr-only">Quantity, {lineItem.key}</label>
					<select
						id="quantity-{lineItem.id}"
						name="quantity"
						class="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base/5 font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
						onchange={(event) => {
							const select = event.target as HTMLSelectElement;
							select.form?.requestSubmit();
						}}
					>
						{#each Array(10)
							.fill(0)
							.map((_, i) => i + 1) as qty}
							<option value={qty} selected={qty === lineItem.quantity}>{qty}</option>
						{/each}
					</select>
					<button class="sr-only" type="submit">Update</button>
				</form>

				<form
					method="POST"
					action="?/removeLineItem"
					use:enhance={() => {
						return async ({ update, result }) => {
							if (result.type === 'success' && result.data?.cart) {
								setCart(result.data.cart as Cart);
							}

							await update();
						};
					}}
				>
					<input type="hidden" name="line-item-id" value={lineItem.id} />
					<button
						type="submit"
						class="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
					>
						<span>Remove</span>
					</button>
				</form>
			</div>
		</div>
	</div>
</li>
