<script lang="ts">
	import { toBlob } from 'html-to-image';
	import { saveAs } from 'file-saver';
	import { file } from '$lib/stores/file';
	import constants from '$lib/constants';
	import Button from './Button.svelte';
	import type { ImageSize, Orientation } from 'src/routes/+page.svelte';

	const { maxDividersValue, dimensions } = constants;
	let fileName = '';

	export let dividers = 10;
	export let currentSize: ImageSize;
	export let orientation: Orientation;

	$: dividers = Math.max(Math.min(dividers, maxDividersValue), 1);

	let divCavnas: HTMLDivElement;
	let imageWidth: number;
	let clientWidth: number, clientHeight: number;

	$: imageWidth =
		currentSize === 'initialSize' ? clientWidth : dimensions[currentSize]?.[orientation].width;
	$: imageHeight =
		currentSize === 'initialSize' ? clientHeight : dimensions[currentSize]?.[orientation].height;
	$: imageUnit = dimensions[currentSize]?.unit;
	$: maxBoxSize = dimensions[currentSize]?.maxBoxSize;

	$: imageDimensionsStyle = `width: ${imageWidth}${imageUnit}; height: ${imageHeight}${imageUnit}`;

	$: boxSize = imageWidth / dividers;
	$: boxSizeWidth = `${boxSize}${imageUnit}`;
	$: boxSizeHeight = `${Math.min(boxSize, maxBoxSize)}${imageUnit}`;

	file.subscribe((file: any) => {
		if (file) {
			fileName = file.name;
		}
	});

	const convertToPng = () =>
		toBlob(divCavnas).then(function (blob) {
			saveAs(blob!, `splitted-${fileName}`);
		});
</script>

<main class="flex flex-col w-full justify-center gap-8 items-center">
	{#if $file}
		<Button on:click={convertToPng}>Download Image</Button>
		<div
			bind:this={divCavnas}
			bind:clientWidth
			bind:clientHeight
			class="relative h-full"
			style={`${currentSize !== 'initialSize' && imageDimensionsStyle}`}
		>
			<img
				class="object-fill w-full"
				style="height: calc(100% - {boxSizeHeight})"
				alt="upload"
				src={URL.createObjectURL($file)}
			/>
			{#each { length: dividers - 1 } as _, i}
				<div
					style={`height: 100%; left: ${boxSize * (i + 1)}${imageUnit}`}
					class="absolute z-10 top-0 h-full w-0.5 bg-black"
				/>
			{/each}
			{#each { length: dividers } as _, i}
				<div style="height: {boxSizeHeight}; width: {boxSizeWidth}; left: {boxSize * i}{imageUnit}" class="absolute border-t-2 bg-white border-black w-full">
					<svg width="100%" height="100%" viewBox="0 0 35 25">
						<text
							x="50%"
							y="50%"
							text-anchor="middle"
							dominant-baseline="central"
							class="fill-black font-bold align-middle">{i + 1}</text
						>
					</svg>
				</div>
			{/each}
		</div>
	{/if}
</main>
