<script lang="ts">
	import { enhance } from '$app/forms';
	import { setCart } from '$lib/Cart.svelte';
	import type { Cart } from '@commercetools/platform-sdk';

	let { data, form } = $props();
	let clearingCustomer = $state(false);
	let settingCustomer = $state(false);
</script>

<div class="mx-auto max-w-2xl px-4 pt-10">
	<div class="text-center">
		<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Set Customer</h1>

		<p class="mt-2 text-sm text-gray-500">
			Use this page to set a customer on the cart. This simulates logging in as the user
		</p>

		<p class="mt-2 text-sm text-gray-500">
			If you don't have a cart, the user will be set on the cart when the cart is created
		</p>
	</div>

	{#if data.customer}
		<div class="flex items-center justify-center bg-white p-8">
			<div class="mx-auto flex w-full max-w-xs flex-col gap-4 rounded-md border p-4">
				<h2 class="text-base/7 font-semibold text-gray-900">Current Customer</h2>
				<p class="mt-1 text-sm/6 text-gray-600">{data.customer.email}</p>
				<form
					method="post"
					action="?/clearCustomer"
					use:enhance={() => {
						clearingCustomer = true;
						return async ({ update, result }) => {
							if (result.type === 'success' && result.data?.cart) {
								setCart(result.data.cart as Cart);
							}

							await update();
							clearingCustomer = false;
						};
					}}
				>
					<button
						type="submit"
						disabled={clearingCustomer}
						class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm/6 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
						>Clear Current Customer</button
					>
					{#if form?.clearCustomerError}
						<p class="mt-2 text-sm text-red-600">
							{form.clearCustomerError}
						</p>
					{/if}
				</form>
			</div>
		</div>
	{/if}

	<form
		method="post"
		action="?/setCustomer"
		use:enhance={() => {
			settingCustomer = true;
			return async ({ update, result }) => {
				if (result.type === 'success' && result.data?.cart) {
					setCart(result.data.cart as Cart);
				}

				await update();
				settingCustomer = false;
			};
		}}
	>
		<div class="flex items-center justify-center bg-white p-8">
			<div class="mx-auto flex w-full max-w-xs flex-col gap-4 rounded-md border p-4">
				<h2 class="text-base/7 font-semibold text-gray-900">Set Customer</h2>
				<div>
					<label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
					<input
						type="text"
						id="email"
						name="email"
						class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6"
					/>
					{#if form?.setCustomerError}
						<p class="mt-2 text-sm text-red-600">
							{form.setCustomerError}
						</p>
					{/if}
				</div>

				<div>
					<button
						type="submit"
						disabled={settingCustomer}
						class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm/6 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
						>Set Customer</button
					>
				</div>
			</div>
		</div>
	</form>
</div>
