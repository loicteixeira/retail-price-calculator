<script lang="ts">
	import { page } from '$app/state';

	const menuLinks = [
		{ path: '/', text: 'Home' },
		{ path: '/about', text: 'About' }
	];
</script>

<header class="mb-8 bg-gray-200">
	<div class="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 p-4">
		<div>
			<a
				class="flex items-center gap-3 rounded pe-1 text-teal-700 focus-visible:outline focus-visible:outline-teal-700 focus-visible:ring focus-visible:ring-teal-300 focus-visible:ring-opacity-50"
				href="/"
			>
				<svg
					class="h-8"
					viewBox="0 0 192 192"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					aria-hidden="true"
				>
					<g id="iconCarrier">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-width="12"
							d="M51.152 26v58.303M22 55.151h58.303m31.394 0H170m-58.303 102.031H170m-58.303-24.667H170m-139.462-8.28 41.227 41.227m-41.227 0 41.227-41.227"
						>
						</path>
					</g>
				</svg>
				<span class="text-2xl text-gray-800 transition hover:text-teal-700">
					Retail Price Calculator
				</span>
			</a>
		</div>

		<div class="flex items-center">
			<nav aria-label="Global">
				<ul class="text flex items-center gap-6">
					{#each menuLinks as { path, text } (path)}
						<li>
							<a
								class={[
									page.route.id === path && 'underline decoration-teal-700',
									'text-gray-800 decoration-2 underline-offset-2 transition hover:text-teal-700 hover:underline'
								]}
								href={path}
							>
								{text}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
</header>
