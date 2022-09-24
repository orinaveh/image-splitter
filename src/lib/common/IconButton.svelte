<script lang="ts">
	import Button from './Button.svelte';

	export let label = '';
</script>

<Button on:click {...$$restProps}>
	<div class="flex gap-2 items-center justify-around">
		<div class="w-6 h-6">
			<slot />
		</div>
		{#if !!label}<span>{label}</span>{/if}
	</div></Button
>
