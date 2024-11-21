<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form
	method="post"
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
