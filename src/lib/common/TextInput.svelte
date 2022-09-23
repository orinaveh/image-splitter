<script lang="ts">
	export let value: number | string;
	let inputProps = {
		class: [$$restProps.class]
	};

	$: classes = `bg-gray-50 border border-accent text-md rounded-lg block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 text-accent ${inputProps.class}`;
</script>

<input {...$$restProps} bind:value class={classes} />
