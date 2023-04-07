<script>
	import BottomNav from '$lib/common/BottomNav.svelte';
	import { headers } from '$lib/stores/headers';
	import '../app.css';
</script>

<div class="flex flex-col gap-4 text-center p-4 w-full justify-center items-center h-full">
	<h1 class="text-center text-5xl font-bold">{$headers.header}</h1>
	<p class="text-2xl text-accent">{$headers.subHeader}</p>
	<slot />
	<BottomNav />
</div>
