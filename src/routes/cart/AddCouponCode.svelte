<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let showInput = $state(false);

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex w-full flex-col">
	<div>
		<button
			class="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
			onclick={() => (showInput = !showInput)}
		>
			Add Promotion Code(s)
		</button>
	</div>
	{#if showInput}
		<div class="flex w-full gap-x-2">
			<form method="POST" action="?/addCouponCode" use:enhance>
				<input
					type="text"
					placeholder="Enter coupon code"
					name="coupon-code"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
				<button
					type="submit"
					class="mt-2 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Apply
				</button>
				{#if form?.success}
					<p>Code has been accepted</p>
				{/if}
				{#if form?.missing}<p class="error">Enter a code</p>{/if}
				{#if form?.incorrect}<p class="error">Code is not valid!</p>{/if}
			</form>
		</div>
	{/if}
</div>
