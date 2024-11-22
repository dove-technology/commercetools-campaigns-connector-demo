<script lang="ts">
	import type { Price } from '@commercetools/platform-sdk';
	import { formatMoney } from '$lib/CurrencyDisplay';
	import { page } from '$app/stores';

	let { price }: { price: Price } = $props();
</script>

{#if price.discounted}
	<span class="line-through">{formatMoney(price.value, $page.data.currentLanguage)}</span>
	<span>{formatMoney(price.discounted.value, $page.data.currentLanguage)}</span>
{:else}
	<span>{formatMoney(price.value, $page.data.currentLanguage)}</span>
{/if}
