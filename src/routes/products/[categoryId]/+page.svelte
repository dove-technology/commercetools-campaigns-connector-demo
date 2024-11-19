<script lang="ts">
	let { data } = $props();
	import { page } from '$app/stores';
	import { formatCurrency } from '$lib/CurrencyDisplay';
</script>

{#key $page.params.categoryId}
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<h2 class="sr-only">Products</h2>

		<div
			class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
		>
			{#each data.products as product}
				<a href={`/product/${product.id}`} class="group">
					<img
						src={product.masterVariant.images ? product.masterVariant.images[0].url : ''}
						alt={product.name['en-GB']}
						class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
					/>
					<h3 class="mt-4 text-sm text-gray-700">{product.name['en-GB']}</h3>
					<p class="mt-1 text-lg font-medium text-gray-900">
						{product.masterVariant.price ? formatCurrency(product.masterVariant.price.value) : ''}
					</p>
				</a>
			{/each}
		</div>
	</div>
{/key}
