<script lang="ts">
	export let value: number | string;
	export let label = '';
	export let rows = 1;
	let inputProps = {
		class: [$$restProps.class]
	};

	$: classes = `bg-primary text-md rounded block p-2 dark:placeholder-gray-400 ${inputProps.class}`;
</script>

<div>
	{#if label}
		<div class="text-left w-full mb-2">
			<label for="input" aria-label={label}>{label}</label>
		</div>
	{/if}
	{#if rows > 1}
		<textarea {rows} id="textarea" dir="rtl" {...$$restProps} bind:value class={classes} />
	{:else}
		<input id="input" dir="rtl" {...$$restProps} bind:value class={classes} />
	{/if}
</div>
