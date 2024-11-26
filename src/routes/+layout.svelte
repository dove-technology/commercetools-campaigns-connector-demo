<script lang="ts">
	import '../app.css';
	import { setCart, getState } from '$lib/Cart.svelte';
	import { onMount } from 'svelte';
	import DoveTechWingLogo from '$lib/DoveTechWingLogo.svelte';
	import { page } from '$app/stores';

	let { data, children } = $props();

	let count = $derived(
		getState().cart?.lineItems.reduce((acc, item) => acc + item.quantity, 0) ?? 0
	);
	let cartLoaded = $state(false);

	if ($page.route.id !== '/cart') {
		onMount(async () => {
			const response = await fetch('/api/cart');

			if (response.ok) {
				// TODO: change the way cart data is returned from the API?
				setCart(await response.json());
				cartLoaded = true;
			}
		});
	} else {
		cartLoaded = true;
	}
</script>

<svelte:head>
	<title>Dovetech commercetools Demo Site</title>
</svelte:head>

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
									>{category.name[data.currentLanguage]}</a
								>
							{/each}
						</div>
					</div>

					<div class="m-x-auto mt-2 w-8">
						<a href="/" title="Dovetech landing page"><DoveTechWingLogo /></a>
					</div>

					<div class="flex flex-1 items-center justify-end">
						<a
							href="/country-currency-picker"
							class="text-sm font-medium text-gray-700 hover:text-gray-800"
						>
							{`${data.currentCountry} - ${data.currentCurrency}`}
						</a>

						<a href="/set-customer" class="p-2 text-gray-400 hover:text-gray-500 lg:ml-4">
							<span class="sr-only">Account</span>
							<svg
								class="size-6"
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
									d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
								></path>
							</svg>
						</a>

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
									>{cartLoaded ? count : '-'}</span
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
