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

	const maxNumberFontSize = 50;

	$: dividers = Math.min(dividers, maxDividersValue);

	let divCavnas: HTMLDivElement;
	let imageWidth: number;
	let clientWidth: number, clientHeight: number;

	$: imageWidth =
		currentSize === 'initialSize' ? clientWidth : dimensions[currentSize]?.[orientation].width;
	$: imageHeight =
		currentSize === 'initialSize' ? clientHeight : dimensions[currentSize]?.[orientation].height;
	$: imageUnit = currentSize === 'initialSize' ? 'px' : dimensions[currentSize]?.unit;

	$: imageDimensionsStyle = `width: ${imageWidth}${imageUnit}; height: ${imageHeight}${imageUnit}`;

	$: boxSize = imageWidth / dividers;

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
			class="relative h-full border-2 overflow-x-scroll border-black"
			style={`${currentSize !== 'initialSize' && imageDimensionsStyle}`}
		>
			<img class="object-fill w-full" style={`height: calc(100% - ${boxSize}${imageUnit})`} alt="upload" src={URL.createObjectURL($file)} />
			{#each { length: dividers - 1 } as _, i}
				<div
					style={`height: 100%; left: ${boxSize * (i + 1)}${imageUnit}`}
					class="absolute top-0 h-full flex justify-center items-center w-0.5 bg-black"
				/>
			{/each}
			<div class="flex w-full justify-center">
				{#each { length: dividers } as _, i}
					<div
						style={`height: ${Math.min(boxSize, 100)}${imageUnit}; width: ${boxSize}${imageUnit}`}
						class="flex justify-center items-center border-y-2 bg-white border-black border-b-0 first:border-l-0 last:border-r-0"
					>
						<span
							style={`font-size: ${Math.min(boxSize / 3, maxNumberFontSize)}${imageUnit}`}
							class="font-bold text-center text-black">{i + 1}</span
						>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</main>
