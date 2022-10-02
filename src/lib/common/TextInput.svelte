<script lang="ts">
	export let value: number | string;
	export let label = '';
	let inputProps = {
		class: [$$restProps.class]
	};

	$: classes = `bg-primary text-md rounded block p-2 dark:placeholder-gray-400 ${inputProps.class}`;
</script>

<div>
	{#if label}
		<div class="text-left w-full my-2">
			<label for="input" aria-label={label}>{label}</label>
		</div>
	{/if}
	<input id="input" {...$$restProps} bind:value class={classes} />
</div>
