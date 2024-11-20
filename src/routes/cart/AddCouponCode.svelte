<script lang="ts">
	let showInput = false;
	let couponCode = '';

	const toggleInput = () => {
		showInput = !showInput;
	};

	const applyCoupon = () => {
		console.log('Applying coupon code:', couponCode);
	};
</script>

<div class="flex w-full flex-col">
	<div>
		<button
			class="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
			on:click={toggleInput}
		>
			Add Promotion Code(s)
		</button>
	</div>
	{#if showInput}
		<div class="flex w-full gap-x-2">
			<input
				type="text"
				placeholder="Enter coupon code"
				bind:value={couponCode}
				class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
			/>
			<button
				class="mt-2 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				on:click={applyCoupon}
			>
				Apply
			</button>
		</div>
	{/if}
</div>
