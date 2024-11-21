<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { formatCurrency } from '$lib/CurrencyDisplay';
	import { setCart, getCart } from '$lib/Cart.svelte.js';
	import AddCouponCode from './AddCouponCode.svelte';
	import CartCouponCodes from './CartCouponCodes.svelte';
	import type { Cart } from '@commercetools/platform-sdk';

	let { data, form } = $props();

	setCart(data.cart);

	let cart = $derived(getCart());
</script>

<div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

	{#if !cart || cart.lineItems.length === 0}
		<div class="mt-12 flex justify-center">
			<p class="text-base">Your cart is empty</p>
		</div>
	{:else}
		<p class="text-sm font-medium text-gray-700">
			{#if cart.customerEmail}
				{cart.customerEmail}
			{:else}
				no customer on cart
				<a href="/set-customer" class="text-indigo-600 hover:text-indigo-700">set one?</a>
			{/if}
		</p>
		<div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
			<section aria-labelledby="cart-heading" class="lg:col-span-7">
				<h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
				<ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
					{#each cart.lineItems as lineItem (lineItem.id)}
						<li class="flex py-6 sm:py-10">
							<div class="shrink-0">
								<a
									href={`/product/${lineItem.productId}`}
									class="font-medium text-gray-700 hover:text-gray-800"
								>
									<img
										src={lineItem.variant?.images![0]?.url}
										alt={lineItem.key}
										class="size-24 rounded-md object-cover object-center sm:size-48"
									/>
								</a>
							</div>

							<div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
								<div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
									<div>
										<div class="flex justify-between">
											<h3 class="text-sm">
												<a
													href={`/product/${lineItem.productId}`}
													class="font-medium text-gray-700 hover:text-gray-800"
													>{lineItem.name[data.currentLanguage]}</a
												>
											</h3>
										</div>

										<p class="mt-1 text-sm font-medium text-gray-900">
											{formatCurrency(lineItem.price.value, data.currentLanguage)}
										</p>
									</div>

									<div class="mt-4 sm:mt-0 sm:pr-9">
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
											<label for="quantity-{lineItem.id}" class="sr-only"
												>Quantity, {lineItem.key}</label
											>
											<input type="hidden" name="line-item-id" value={lineItem.id} />
											<select
												id="quantity-{lineItem.id}"
												name="quantity"
												class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base/5 font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
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

										<div class="absolute right-0 top-0">
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
													class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
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
														/>
													</svg>
												</button>
											</form>
										</div>
									</div>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</section>
			<!-- Order summary -->
			<section
				aria-labelledby="summary-heading"
				class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
			>
				<div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
					<h2 id="summary-heading" class="font-meddeleteItemt-gray-900 text-lg">Order summary</h2>

					<dl class="mt-6 space-y-4">
						<!-- <div class="flex items-center justify-between">
							<dt class="text-sm text-gray-600">Subtotal</dt>
							<dd class="text-sm font-medium text-gray-900">0</dd>
						</div> -->
						<div class="flex items-center justify-between border-t border-gray-200 pt-4">
							<dt class="flex items-center text-sm text-gray-600">
								<span>Shipping estimate</span>
							</dt>
							<dd class="text-sm font-medium text-gray-900">
								{cart.shippingInfo?.price
									? formatCurrency(cart.shippingInfo.price, data.currentLanguage)
									: '-'}
							</dd>
						</div>

						<div class="flex items-center justify-between border-t border-gray-200 pt-4">
							<dt class="text-base font-medium text-gray-900">Order total</dt>
							<dd class="text-base font-medium text-gray-900">
								{cart.totalPrice ? formatCurrency(cart.totalPrice, data.currentLanguage) : '-'}
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
		</div>
	{/if}
</div>
