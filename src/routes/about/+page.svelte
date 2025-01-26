<script lang="ts">
	import H from '$lib/components/Atoms/AnchoredHeading.svelte';
</script>

<svelte:head>
	<title>About – Retail Price Calculator</title>
	<meta
		name="description"
		content="More info & Frequently asked questions about the Retail Price Calculator."
	/>
</svelte:head>

<div class="prose mx-auto mb-8 px-4 sm:px-6 lg:px-8">
	<H level={1} id="about">About</H>

	<p>
		<span class="text-teal-700">Retail Price Calculator</span> is an
		<a href="https://github.com/loicteixeira/retail-price-calculator" target="_blank">
			open-source tool
		</a> designed to help you decide how to price your retail products, taking into account a base price,
		bundles options and various fees.
	</p>

	<H level={2} id="faq">Frequently Asked Questions</H>

	<H level={3} id="data-privacy">Is my data safe?</H>

	<p>
		The values you enter in the calculator are never uploaded to any server;<br />Your personal data
		is never collected or used in any way while using this calculator.<br />You don’t need to create
		an account or log in to use it.
	</p>

	<p>
		However, the data is saved in your browser's local storage so you won't have to set everything
		up again the next time you use the calculator. If you wish to delete the data, either click the
		"Clear Calculator" action or clear your browser storage.
	</p>

	<H level={3} id="share-feedback">How can I share feedback?</H>

	<p>
		Please use this <a href="https://forms.gle/xrsSzuvchw26hppBA" target="_blank">Google Form</a>
		for bug reports and feature requests.
	</p>

	<H level={3} id="support">
		How can I support this project and your other dev projects aimed at helping indie businesses?
	</H>

	<p>
		Thank you for wanting to support my work! If you'd like to leave a tip, you can do so through my
		wife's <a href="https://ko-fi.com/abandonambition" target="_blank">Ko-Fi tip jar</a>. Don't
		worry, she'll make sure to share it. 😉
	</p>

	<p>
		Speaking of other projects, you might be interested in
		<a href="https://etcsv-stats.netlify.app/" target="_blank"> Etcsv Stats </a>, a tool designed to
		help you make sense of your sales on Etsy.
	</p>

	<H level={2} id="changelog">Changelog</H>

	<H level={3} id="2025-01-26">
		<time datetime="2025-01-26">January 26<sup>th</sup> 2025</time>
	</H>

	<ul>
		<li>Remember calculator state between visits and when changing pages.</li>
		<li>Fix accessibility labelling of form fields.</li>
	</ul>

	<H level={3} id="2025-01-21">
		<time datetime="2025-01-21">January 21<sup>st</sup> 2025</time>
	</H>

	<ul>
		<li>Add CSV Export of the computed data.</li>
		<li>Fix navigation display on small screens.</li>
	</ul>

	<H level={3} id="2025-01-13">
		<time datetime="2025-01-13">January 13<sup>th</sup> 2025</time>
	</H>

	<ul>
		<li>Rework warnings display and add a message on hover.</li>
		<li>Right align numbers in table.</li>
		<li>Highlight fees and net values in table.</li>
	</ul>

	<H level={3} id="2025-01-12">
		<time datetime="2025-01-12">January 12<sup>th</sup> 2025</time>
	</H>

	<ul>
		<li>
			‼️ Update the break even calculation. It now displays the total number of items needed to be
			sold to recoup costs, instead of the total number of sales of the given bundle.
		</li>
		<li>
			Add a warning for negative net & margin, and break even value which exceeds the order count.
		</li>
		<li>Alternate row colors in results table.</li>
		<li>Add link to feedback form and support.</li>
	</ul>

	<H level={3} id="2025-01-11">
		<time datetime="2025-01-11">January 11<sup>th</sup> 2025</time>
	</H>

	<ul>
		<li>Initial Release.</li>
	</ul>
</div>
