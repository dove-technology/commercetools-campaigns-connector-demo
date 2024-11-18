<script lang="ts">
	export let data;
	let selectedVariantSku = data.product.masterVariant.sku;

	async function addToCart() {
		const response = await fetch(`/api/cart/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ sku: selectedVariantSku })
		});
		if (response.ok) {
			console.log('Product added to cart');
		} else {
			console.log('Failed to add product to cart');
		}
	}
</script>

<h1>Product Page</h1>

{selectedVariantSku}

<button on:click={addToCart}>Add to Cart</button>
