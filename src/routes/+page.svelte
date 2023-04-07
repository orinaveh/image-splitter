<script lang="ts" context="module">
	export type ImageSize = 'a4' | 'a3' | 'initialSize';
	export type Orientation = 'portrait' | 'landscape';
</script>

<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
	import { file } from '$lib/stores/file';
	import ImageDisplay from '$lib/common/ImageDisplay.svelte';
	import TextInput from '$lib/common/TextInput.svelte';
	import constants from '$lib/constants';
	import Select, { type ListItem } from '$lib/common/Select.svelte';

	import MdStayCurrentPortrait from 'svelte-icons/md/MdStayCurrentPortrait.svelte';
	import IconButton from '$lib/common/IconButton.svelte';
	import { onMount } from 'svelte/internal';
	import { headers } from '$lib/stores/headers';

	const list: ListItem<ImageSize>[] = [
		{ label: 'A4', value: 'a4' },
		{ label: 'A3', value: 'a3' },
		{ label: 'Original Size', value: 'initialSize' }
	];

	onMount(() => {
		headers.set('Vertical Puzzle Creator', 'Simple Tool for adding vertical lines to images');
	})

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
	<div
		class={`grid grid-flow-col grid-cols-2 gap-4 items-end ${
			!!wasImageLoaded && 'grid-cols-[auto_1fr_1fr]'
		}`}
	>
		{#if !!wasImageLoaded}
			<IconButton label="Remove" type="danger" on:click={file.reset}>X</IconButton>
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
				<div class="rotate-{orientation}">
					<MdStayCurrentPortrait />
				</div>
			</IconButton>
		{/if}
	</div>
	<ImageDisplay {orientation} {currentSize} {dividers} />
	{#if !wasImageLoaded}
		<Dropzone
			containerClasses="!p-32 !w-1/2 !bg-primary !text-accent !rounded !cursor-pointer"
			accept={['image/*']}
			multiple={false}
			on:drop={file.handleFileSelection}>Drop Image Here</Dropzone
		>
	{/if}
</div>

<style>
	.rotate-portrait {
		transform: rotate(0deg);
		animation-name: rotate;
		animation-duration: 500ms;
		animation-timing-function: ease-out;
	}
	.rotate-landscape {
		transform: rotate(90deg);
		animation-name: rotate-out;
		animation-duration: 500ms;
		animation-timing-function: ease-out;
	}

	@keyframes rotate {
		from {
			transform: rotate(90deg);
		}
		70% {
			transform: rotate(-30deg);
		}
		90% {
			transform: rotate(10deg);
		}
		to {
			transform: rotate(0deg);
		}
	}

	@keyframes rotate-out {
		from {
			transform: rotate(0deg);
		}
		70% {
			transform: rotate(120deg);
		}
		90% {
			transform: rotate(80deg);
		}
		to {
			transform: rotate(90deg);
		}
	}
</style>
