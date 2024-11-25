<script lang="ts">
	let { data } = $props();
	import { page } from '$app/stores';
	import ProductPrice from '$lib/ProductPrice.svelte';
	import { getImageUrl } from '$lib/ProductHelpers';
</script>

{#key `${$page.params.categoryId}-${data.page}`}
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<h2 class="sr-only">Products</h2>

		<div
			class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
		>
			{#each data.products as product}
				<a href={`/product/${product.id}`} class="group">
					<img
						src={getImageUrl(product.masterVariant.images)}
						alt={product.name[data.currentLanguage]}
						class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
					/>
					<h3 class="mt-4 text-sm text-gray-700">{product.name[data.currentLanguage]}</h3>
					<p class="mt-1 text-lg font-medium text-gray-900">
						{#if product.masterVariant.price}
							<ProductPrice price={product.masterVariant.price} />
						{/if}
					</p>
				</a>
			{/each}
		</div>

		<nav
			aria-label="Pagination"
			class="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
		>
			<div class="min-w-0 flex-1">
				{#if data.page > 1}
					<a
						href={`/products/${$page.params.categoryId}` +
							`${data.page > 2 ? `?page=${data.page - 1}` : ''}`}
						class="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600"
						>Previous</a
					>
				{/if}
			</div>
			{#if data.totalPages && data.page < data.totalPages}
				<div class="flex min-w-0 flex-1 justify-end">
					<a
						href={'/products/' + $page.params.categoryId + `?page=${data.page + 1}`}
						class="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600"
						>Next</a
					>
				</div>
			{/if}
		</nav>
	</div>
{/key}
