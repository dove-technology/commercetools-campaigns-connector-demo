<script lang="ts">
	import type { Price } from '@commercetools/platform-sdk';
	import { formatCurrency } from '$lib/CurrencyDisplay';
	import { page } from '$app/stores';

	let { price }: { price: Price } = $props();
</script>

{#if price.discounted}
	<span class="line-through">{formatCurrency(price.value, $page.data.currentLanguage)}</span>
	<span>{formatCurrency(price.discounted.value, $page.data.currentLanguage)}</span>
{:else}
	<span>{formatCurrency(price.value, $page.data.currentLanguage)}</span>
{/if}
