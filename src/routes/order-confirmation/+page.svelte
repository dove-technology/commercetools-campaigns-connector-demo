<script lang="ts">
	import { formatCurrency } from '$lib/CurrencyDisplay.js';

	let { data } = $props();
</script>

<div class="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="max-w-xl">
		<h1 class="text-base font-medium text-indigo-600">Thank you!</h1>
		<p class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">It's on the way!</p>
		<p class="mt-2 text-base text-gray-500">Your order will be with you soon.</p>
	</div>

	<div class="mt-10 border-t border-gray-200">
		<h2 class="sr-only">Your order</h2>

		<h3 class="sr-only">Items</h3>
		{#each data.order.lineItems as lineItem}
			<div class="flex space-x-6 border-b border-gray-200 py-10">
				<img
					src={lineItem.variant?.images![0]?.url}
					alt={lineItem.name[data.currentLanguage]}
					class="size-20 flex-none rounded-lg bg-gray-100 object-cover sm:size-40"
				/>
				<div class="flex flex-auto flex-col">
					<div>
						<h4 class="font-medium text-gray-900">{lineItem.name[data.currentLanguage]}</h4>
					</div>
					<div class="mt-6 flex flex-1 items-end">
						<dl class="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
							<div class="flex">
								<dt class="font-medium text-gray-900">Quantity</dt>
								<dd class="ml-2 text-gray-700">{lineItem.quantity}</dd>
							</div>
							<div class="flex pl-4 sm:pl-6">
								<dt class="font-medium text-gray-900">Price</dt>
								<dd class="ml-2 text-gray-700">
									{formatCurrency(lineItem.price.value, data.currentLanguage)}
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
