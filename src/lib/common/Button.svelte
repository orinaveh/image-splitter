<script lang="ts">
	export let type: 'normal' | 'danger' = 'normal';

	$: classes = `btn btn-primary btn-md font-bold rounded ${
		type === 'danger'
			? 'btn-error'
			: ''
	}`;
</script>

<button {...$$restProps} class={classes} on:click><slot /></button>
