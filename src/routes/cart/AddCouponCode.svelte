<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex w-full flex-col">
	<form method="POST" action="?/addCouponCode" use:enhance class="space-y-4">
		<div>
			<label for="coupon-code" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
				Do you have a promo code?
			</label>
			<input
				type="text"
				id="coupon-code"
				name="coupon-code"
				class="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
				placeholder=""
			/>
			{#if form?.success}
				<p class="mt-2 text-sm text-green-600">Code has been accepted</p>
			{/if}
			{#if form?.missing}<p class="mt-2 text-sm text-red-600">Enter a code</p>{/if}
			{#if form?.incorrect}<p class="mt-2 text-sm text-red-600">Code is not valid!</p>{/if}
			{#if form?.error}<p class="mt-2 text-sm text-red-600">{form.error}</p>{/if}
		</div>
		<button
			type="submit"
			class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
		>
			Apply Code
		</button>
	</form>
</div>
