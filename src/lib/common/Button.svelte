<script lang="ts">
	export let type: 'normal' | 'danger' = 'normal';

	$: classes = `bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark dark:hover:bg-secondary text-accent font-bold py-2 px-4 rounded ${
		type === 'danger'
			? ' bg-red-500 dark:bg-red-800 hover:bg-red-700 dark:hover:bg-red-900 text-white font-bold py-2 px-4 rounded'
			: ''
	}`;
</script>

<button {...$$restProps} class={classes} on:click><slot /></button>
