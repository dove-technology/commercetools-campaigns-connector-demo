<script lang="ts">
	import { formatCurrency } from '$lib/CurrencyDisplay';
	import { addItem } from '$lib/Cart.svelte.js';

	export let data;
	let selectedVariantSku = data.product.masterVariant.sku;

	async function addToCart() {
		if (selectedVariantSku) {
			await addItem(selectedVariantSku);
		}
	}
</script>

<main class="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
	<div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
		<div class="lg:col-span-5 lg:col-start-8">
			<div class="flex justify-between">
				<h1 class="text-xl font-medium text-gray-900">{data.product.name[data.currentLanguage]}</h1>
				<p class="text-xl font-medium text-gray-900">
					{data.product.masterVariant.price
						? formatCurrency(data.product.masterVariant.price.value, data.currentLanguage)
						: ''}
				</p>
			</div>
		</div>

		<!-- Image gallery -->
		<div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
			<h2 class="sr-only">Images</h2>

			<div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
				<img
					src={data.product.masterVariant.images ? data.product.masterVariant.images[0].url : ''}
					alt="Back of women&#039;s Basic Tee in black."
					class="rounded-lg lg:col-span-2 lg:row-span-2"
				/>
			</div>
		</div>

		<div class="mt-8 lg:col-span-5">
			<form>
				<button
					type="button"
					on:click={addToCart}
					class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>Add to cart</button
				>
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
