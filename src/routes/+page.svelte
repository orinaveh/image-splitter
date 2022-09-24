<script lang="ts" context="module">
	export type ImageSize = 'a4' | 'initialSize';
	export type Orientation = 'portrait' | 'landscape';
</script>

<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
	import { file } from '$lib/stores/file';
	import ImageDisplay from '$lib/common/ImageDisplay.svelte';
	import TextInput from '$lib/common/TextInput.svelte';
	import constants from '$lib/constants';
	import Button from '$lib/common/Button.svelte';
	import Select, { type ListItem } from '$lib/common/Select.svelte';

	import MdStayCurrentPortrait from 'svelte-icons/md/MdStayCurrentPortrait.svelte';
	import MdStayCurrentLandscape from 'svelte-icons/md/MdStayCurrentLandscape.svelte';
	import IconButton from '$lib/common/IconButton.svelte';

	const list: ListItem<ImageSize>[] = [
		{ label: 'A4', value: 'a4' },
		{ label: 'Original Size', value: 'initialSize' }
	];

	let orientation: Orientation = 'portrait';

	const changeOrientation = () => {
		orientation = orientation === 'portrait' ? 'landscape' : 'portrait';
	};

	const { maxDividersValue } = constants;
	$: wasImageLoaded = $file !== null;

	let currentSize: ImageSize;
	let dividers = 10;
</script>

<div class="flex gap-4 flex-col text-center p-4 w-full justify-center items-center">
	<h1 class="text-center text-5xl font-bold underline">Image Splitter</h1>
	<p class="text-2xl text-accent">Simple Tool for adding vertical lines to images</p>
	<div
		class={`grid grid-flow-col grid-cols-2 gap-4 items-end ${
			!!wasImageLoaded && 'grid-cols-[auto_1fr_1fr]'
		}`}
	>
		{#if !!wasImageLoaded}
			<Button type="danger" on:click={file.reset}>X</Button>
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
			{list}
			initialSelectedItem="a4"
			bind:selectedValue={currentSize}
			class="flex-grow"
		/>
		{#if currentSize !== 'initialSize'}
			<IconButton label="Orientation" on:click={changeOrientation}>
				{#if orientation === 'portrait'}
					<MdStayCurrentPortrait />
				{:else}
					<MdStayCurrentLandscape />
				{/if}
			</IconButton>
		{/if}
	</div>
	<ImageDisplay {orientation} {currentSize} {dividers} />
	{#if !wasImageLoaded}
		<Dropzone
			containerClasses="!p-32 !w-1/2 !bg-primary-dark !text-accent !rounded !cursor-pointer"
			accept={['image/*']}
			multiple={false}
			on:drop={file.handleFileSelection}>Drop Image Here</Dropzone
		>
	{/if}
</div>
