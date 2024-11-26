<script lang="ts">
	import { setCart, getState } from '$lib/Cart.svelte.js';
	import CartLineItem from './CartLineItem.svelte';
	import CartSummary from './CartSummary.svelte';

	let { data, form } = $props();

	// set the cart in shared state so the mini-cart can use it
	setCart(data.cart);

	let cartState = getState();
</script>

<div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

	{#if !cartState.cart || cartState.cart.lineItems.length === 0}
		<div class="mt-12 flex justify-center">
			<p class="text-base">Your cart is empty</p>
		</div>
	{:else}
		<p class="text-sm font-medium text-gray-700">
			{#if cartState.cart.customerEmail}
				{cartState.cart.customerEmail}
			{:else}
				no customer on cart
				<a href="/set-customer" class="text-indigo-600 hover:text-indigo-700">set one?</a>
			{/if}
		</p>
		<div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
			<section aria-labelledby="cart-heading" class="lg:col-span-7">
				<h2 class="sr-only">Items in your shopping cart</h2>
				<ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
					{#each cartState.cart.lineItems as lineItem (lineItem.id)}
						<CartLineItem {lineItem} cart={cartState.cart} />
					{/each}
				</ul>
			</section>

			<CartSummary cart={cartState.cart} {form} />
		</div>
	{/if}
</div>
