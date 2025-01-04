<script lang="ts">
	let currencySymbol = $state('€');

	const bundles = [
		{ name: '2+1', buy: 2, free: 1, round: null },
		{ name: '3+1', buy: 3, free: 1, round: null },
		{ name: '4+1', buy: 4, free: 1, round: null },
		{ name: '2 discounted', buy: 2, free: 0, round: 5 },
		{ name: '3 discounted', buy: 2, free: 0, round: 5 }
	];
	const fees = [
		{ name: 'Taxes', amount: 13.7, type: 'percent' },
		{ name: 'Listing', amount: 0.1, type: 'flat' },
		{ name: 'Transaction Flat', amount: 0.25, type: 'flat' },
		{ name: 'Transaction Percent', amount: 1.5, type: 'percent' },
		{ name: 'Shipping', amount: 5, type: 'flat' }
	];
</script>

<div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
	<form class="flex flex-row flex-wrap gap-6">
		<div class="flex grow flex-col gap-6">
			<fieldset class="flex flex-col gap-4 rounded border border-solid border-gray-300 p-3">
				<legend class="px-2">Product Information</legend>

				<label class="block">
					Unit Cost
					<div class="relative">
						<input
							id="unit-cost"
							type="number"
							class="mt-1 block w-full rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						<span class="absolute inset-y-0 end-0 grid place-content-center px-4">
							{currencySymbol}
						</span>
					</div>
				</label>
				<label class="block">
					Order Count
					<input
						id="order-count"
						type="number"
						class="mt-1 block w-full rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</label>
			</fieldset>

			<fieldset class="flex flex-col gap-4 rounded border border-solid border-gray-300 p-3">
				<legend class="px-2">Settings</legend>

				<label class="block">
					Currency Symbol
					<input
						id="currency-symbol"
						type="text"
						bind:value={currencySymbol}
						class="mt-1 block w-full rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</label>
			</fieldset>
		</div>

		<fieldset class="grow rounded border border-solid border-gray-300 p-3">
			<legend class="px-2">Bundle Options</legend>

			<table class="mr-auto table-fixed">
				<thead>
					<tr class="text-left align-text-top uppercase text-gray-700">
						<th class="p-2">Name</th>
						<th class="p-2">Buy</th>
						<th class="p-2">Free</th>
						<th colspan="2" class="p-2 leading-none">
							Rounding<br />
							<span class="text-[.4em]">down to nearest</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{#each bundles as bundle}
						<tr>
							<td class="w-full px-2 py-1.5">
								<input
									id=""
									type="text"
									value={bundle.name}
									aria-label="Name"
									class="mt-1 block w-full rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</td>
							<td class="px-2 py-1.5">
								<input
									id=""
									type="number"
									value={bundle.buy}
									aria-label="Buy"
									class="mt-1 block w-14 rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</td>
							<td class="px-2 py-1.5">
								<input
									id=""
									type="number"
									value={bundle.free}
									aria-label="Free"
									class="mt-1 block w-14 rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</td>
							<td class="px-2 py-1.5">
								<input
									id=""
									type="number"
									value={bundle.round}
									aria-label="Round down to nearest"
									class="mt-1 block w-20 rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</td>
							<td class="px-2 py-1.5"><button>╳</button></td>
						</tr>
					{/each}
					<tr>
						<td colspan="5" class="p-3">
							<button class="text-blue-700">+ Add Bundle</button>
						</td>
					</tr>
				</tbody>
			</table>
		</fieldset>

		<fieldset class="grow rounded border border-solid border-gray-300 p-3">
			<legend class="px-2">Fees</legend>

			<table class="mr-auto table-fixed">
				<thead>
					<tr class="h-[3.2rem] text-left align-text-top uppercase text-gray-700">
						<th class="p-2">Name</th>
						<th class="p-2">Amount</th>
						<th class="p-2">Type</th>
						<th>&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{#each fees as fee}
						<tr>
							<td class="w-full px-2 py-1.5">
								<input
									id=""
									type="text"
									value={fee.name}
									aria-label="Name"
									class="mt-1 block w-full rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</td>
							<td class="px-2 py-1.5">
								<input
									id=""
									type="number"
									value={fee.amount}
									aria-label="Amount"
									class="mt-1 block w-20 rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</td>
							<td class="px-2 py-1.5">
								<select
									id=""
									aria-label="type"
									class="w-18 mt-1 block rounded border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								>
									<option selected={fee.type == 'flat'}>{currencySymbol}</option>
									<option selected={fee.type == 'percent'}>%</option>
								</select>
							</td>
							<td class="px-2 py-1.5"><button>╳</button></td>
						</tr>
					{/each}
					<tr>
						<td colspan="5" class="p-3">
							<button class="text-blue-700">+ Add Fee</button>
						</td>
					</tr>
				</tbody>
			</table>
		</fieldset>
	</form>
</div>
