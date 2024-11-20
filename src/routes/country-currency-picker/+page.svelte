<script lang="ts">
	export let data;
</script>

<form method="POST">
	<div class="flex items-center justify-center bg-white p-8">
		<div class="mx-auto flex w-full max-w-xs flex-col gap-4">
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
			<div>
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
			<div class="rounded-md bg-yellow-50 p-4">
				<div class="flex">
					<div class="shrink-0">
						<svg
							class="size-5 text-yellow-400"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
							data-slot="icon"
						>
							<path
								fill-rule="evenodd"
								d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3">
						<h3 class="text-sm font-medium text-yellow-800">Warning</h3>
						<div class="mt-2 text-sm text-yellow-700">
							<p>You're current cart will be cleared</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm/6 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Update
				</button>
			</div>
		</div>
	</div>
</form>
