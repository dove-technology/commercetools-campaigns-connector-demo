<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { setCart, getCart } from '$lib/Cart.svelte';
	import { onMount } from 'svelte';
	import DoveTechWingLogo from '$lib/DoveTechWingLogo.svelte';

	let { children } = $props();
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
							{#each $page.data.categories as category}
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
						<!-- <a href="#" class="hidden text-gray-700 hover:text-gray-800 lg:flex lg:items-center">
							<span class="ml-3 block text-sm font-medium">CAD</span>
							<span class="sr-only">, change currency</span>
						</a> -->

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
