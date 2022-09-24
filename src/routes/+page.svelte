<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
	import { file } from '$lib/stores/file';
	import ImageDisplay from '$lib/common/ImageDisplay.svelte';
	import TextInput from '$lib/common/TextInput.svelte';
	import constants from '$lib/constants';
	import Button from '$lib/common/Button.svelte';
	import Select, { type ListItem } from '$lib/common/Select.svelte';

	const { maxDividersValue } = constants;
	$: wasImageLoaded = $file !== null;

	let currentSize: ListItem;
	let dividers = 10;
</script>

<div class="flex gap-4 flex-col text-center p-4 w-full justify-center items-center">
	<h1 class="text-center text-5xl font-bold underline">Image Splitter</h1>
	<p class="text-2xl text-accent">Simple Tool for adding vertical lines to images</p>
	<div class={`grid grid-flow-col grid-cols-2 gap-4 items-end ${!!wasImageLoaded && 'grid-cols-[auto_1fr_1fr]'}`}>
		{#if !!wasImageLoaded}
			<Button type="danger" on:click={() => file.reset()}>X</Button>
		{/if}
		<TextInput
			bind:value={dividers}
			label="Dividers"
			placeholder="Number Of Vertical Lines"
			type="number"
			max={maxDividersValue}
			class="flex-grow"
		/>
		<Select
			label="Resize"
			list={[
				{ label: 'A4', value: 'a4' },
				{ label: 'Initial Size', value: 'initialSize' },
			]}
			initialSelectedItem="A4"
			bind:selectedItem={currentSize}
			class="flex-grow"
		/>
	</div>
	<ImageDisplay {dividers} />
	{#if !wasImageLoaded}
		<Dropzone
			containerClasses="!p-32 !w-1/2 !bg-primary-dark !text-accent !rounded !cursor-pointer"
			accept={['image/*']}
			multiple={false}
			on:drop={file.handleFileSelection}>Drop Image Here</Dropzone
		>
	{/if}
</div>
