<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

{#if data.customer}
	<p>Current Customer: {data.customer.email}</p>
	<form method="post" action="?/clearCustomer" use:enhance>
		<button type="submit">Clear Customer</button>
	</form>
{/if}

<form
	method="post"
	action="?/setCustomer"
	use:enhance={() => {
		return async ({ update, result }) => {
			// if (result.type === 'success' && result.data?.cart) {
			// 	console.log(result.data.cart.);
			// }

			await update();
		};
	}}
>
	<label for="email">Customer Email:</label>
	<input type="text" id="email" name="email" value="stephen.upchurch@dovetech.com" required />

	<button type="submit">Set Customer</button>
</form>
