<script lang="ts">
	let { data } = $props();
</script>

<h1>Order Confirmation</h1>

<p>Order ID: {data.order.id}</p>
<p>Order Total: {data.order.totalPrice.centAmount / 100} {data.order.totalPrice.currencyCode}</p>
