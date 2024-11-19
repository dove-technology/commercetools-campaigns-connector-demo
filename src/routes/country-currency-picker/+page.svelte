<script lang="ts">
	export let data;
</script>

<form method="POST">
	<div class="flex items-center justify-center bg-white p-8">
		<div class="mx-auto w-full max-w-xs">
			<div>
				<label for="currency" class="block text-sm/6 font-medium text-gray-900">Currency</label>
				<select
					id="currency"
					name="currency"
					bind:value={data.currentCurrency}
					class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6"
				>
					{#each data.currencies as currency}
						<option>{currency}</option>
					{/each}
				</select>
			</div>
			<div class="mt-2">
				<label for="country" class="block text-sm/6 font-medium text-gray-900">Country</label>
				<select
					id="country"
					name="country"
					bind:value={data.currentCountry}
					class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6"
				>
					{#each data.countries as country}
						<option>{country}</option>
					{/each}
				</select>
			</div>
			<div>
				<button
					type="submit"
					class="mt-4 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm/6 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Update
				</button>
			</div>
		</div>
	</div>
</form>
