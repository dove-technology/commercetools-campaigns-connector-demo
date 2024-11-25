<script lang="ts">
	import { enhance } from '$app/forms';
	import { setCart } from '$lib/Cart.svelte.js';
	import type { Cart } from '@commercetools/platform-sdk';
	import ProductPrice from '$lib/ProductPrice.svelte';
	import { getImageUrl } from '$lib/ProductHelpers';

	let { data, form } = $props();

	const allVariants = [data.product.masterVariant, ...data.product.variants];
	let addingToCart = $state(false);
	let selectedVariant = $state(data.product.masterVariant);
</script>

<main class="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
	<div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
		<div class="lg:col-span-5 lg:col-start-8">
			<div class="flex justify-between">
				<h1 class="text-xl font-medium text-gray-900">{data.product.name[data.currentLanguage]}</h1>
				<p class="text-xl font-medium text-gray-900">
					{#if selectedVariant.price}
						<ProductPrice price={selectedVariant.price} />
					{/if}
				</p>
			</div>
		</div>

		<!-- Image gallery -->
		<div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
			<h2 class="sr-only">Images</h2>

			<div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
				<img
					src={getImageUrl(data.product.masterVariant.images)}
					alt="Back of women&#039;s Basic Tee in black."
					class="rounded-lg lg:col-span-2 lg:row-span-2"
				/>
			</div>
		</div>

		<div class="mt-8 lg:col-span-5">
			<form
				method="POST"
				use:enhance={() => {
					addingToCart = true;

					return async ({ update, result }) => {
						if (result.type === 'success' && result.data?.cart) {
							setCart(result.data.cart as Cart);
						}

						await update();
						addingToCart = false;
					};
				}}
			>
				{#if allVariants.length > 1}
					<div class="mt-4">
						<label for="sku" class="block text-sm font-medium text-gray-700">Variant</label>
						<select
							id="sku"
							name="sku"
							class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							onchange={(event) => {
								const selectedSku = (event.target as HTMLSelectElement).value;

								const newSelectedVariant = allVariants.find(
									(variant) => variant.sku === selectedSku
								);

								if (newSelectedVariant) {
									selectedVariant = newSelectedVariant;
								} else {
									throw new Error('Selected variant not found');
								}
							}}
						>
							{#each allVariants as variant}
								<option value={variant.sku}>{variant.sku}</option>
							{/each}
						</select>
					</div>
				{:else}
					<input type="hidden" name="sku" value={selectedVariant.sku} />
				{/if}

				<button
					type="submit"
					disabled={addingToCart || !selectedVariant.price}
					class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
					>Add to cart</button
				>
				{#if form?.addToCartError}
					<p class="mt-2 text-sm text-red-600">
						{form.addToCartError}
					</p>
				{/if}

				{#if !selectedVariant.price}
					<p class="mt-2 text-sm text-red-600">
						No matching price for the current context. Check the product price configuration (e.g.
						is there a valid entry for your currency and country selection?).
					</p>
				{/if}
			</form>

			<!-- Product details -->
			<div class="mt-10">
				<h2 class="text-sm font-medium text-gray-900">Description</h2>

				<div class="mt-4 space-y-4 text-sm/6 text-gray-500">
					<p>
						{data.product.description ? data.product.description[data.currentLanguage] : ''}
					</p>
				</div>
			</div>
		</div>
	</div>
</main>
