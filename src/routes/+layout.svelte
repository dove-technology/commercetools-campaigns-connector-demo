<script lang="ts">
	import '../app.css';
	import { setCart, getCart } from '$lib/Cart.svelte';
	import { onMount } from 'svelte';
	import DoveTechWingLogo from '$lib/DoveTechWingLogo.svelte';

	let { data, children } = $props();
	let count = $derived(getCart()?.lineItems.length);

	onMount(async () => {
		if (count === undefined) {
			const response = await fetch('/api/cart');

			if (response.ok) {
				setCart(await response.json());
			}
		}
	});
</script>

<div class="bg-white">
	<header class="relative bg-white">
		<nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="border-b border-gray-200">
				<div class="flex h-16 items-center justify-between">
					<div class="flex-1 self-stretch">
						<div class="flex h-full space-x-8">
							{#each data.categories as category}
								<a
									href={`/products/${category.id}`}
									class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
									>{category.name['en-GB']}</a
								>
							{/each}
						</div>
					</div>

					<div class="m-x-auto mt-2 w-8">
						<a href="/" title="Dovetech landing page"><DoveTechWingLogo /></a>
					</div>

					<div class="flex flex-1 items-center justify-end">
						<!-- Country selector -->
						<form method="POST" action="/change-country">
							<div class="inline-block">
								<label for="country" class="sr-only">Country</label>
								<div
									class="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white"
								>
									<select
										id="country"
										name="country"
										bind:value={data.currentCountry}
										onchange={(event) => {
											const target = event.target as HTMLSelectElement;
											target.form?.submit();
										}}
										class="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
									>
										{#each data.countries as country}
											<option>{country}</option>
										{/each}
									</select>
									<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
										<svg
											class="size-5 text-gray-500"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
											data-slot="icon"
										>
											<path
												fill-rule="evenodd"
												d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>
								</div>
							</div>
						</form>
						<!-- Currency selector -->
						<form method="POST" action="/change-currency">
							<div class="inline-block">
								<label for="currency" class="sr-only">Currency</label>
								<div
									class="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white"
								>
									<select
										id="currency"
										name="currency"
										bind:value={data.currentCurrency}
										onchange={(event) => {
											const target = event.target as HTMLSelectElement;
											target.form?.submit();
										}}
										class="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
									>
										{#each data.currencies as currency}
											<option>{currency}</option>
										{/each}
									</select>
									<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
										<svg
											class="size-5 text-gray-500"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
											data-slot="icon"
										>
											<path
												fill-rule="evenodd"
												d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>
								</div>
							</div>
						</form>

						<!-- Cart -->
						<div class="ml-4 flow-root lg:ml-6">
							<a href="/cart" class="group -m-2 flex items-center p-2">
								<svg
									class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
									/>
								</svg>
								<span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
									>{count}</span
								>
								<span class="sr-only">items in cart, view bag</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
	{@render children()}
</div>
