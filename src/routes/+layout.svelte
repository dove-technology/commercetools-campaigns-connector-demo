<script lang="ts">
	import '../app.css';
	import DoveTechWingLogo from '$lib/DoveTechWingLogo.svelte';
	import MiniCart from '$lib/MiniCart.svelte';

	let { data, children } = $props();
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

						<MiniCart />
					</div>
				</div>
			</div>
		</nav>
	</header>
	{@render children()}
</div>
