<script lang="ts">
	export let data;
</script>

<form method="POST">
	<div>
		<label for="currency">Currency</label>

		<select id="currency" name="currency" bind:value={data.currentCurrency}>
			{#each data.currencies as currency}
				<option>{currency}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="country">Country</label>

		<select id="country" name="country" bind:value={data.currentCountry}>
			{#each data.countries as country}
				<option>{country}</option>
			{/each}
		</select>
	</div>

	<button type="submit">Submit</button>
</form>
