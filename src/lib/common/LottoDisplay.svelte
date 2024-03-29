<script lang="ts">
	import { toBlob } from 'html-to-image';
	import { saveAs } from 'file-saver';
	import { file } from '$lib/stores/file';
	import constants from '$lib/constants';
	import Button from './Button.svelte';
	import type { ImageSize, Orientation } from 'src/routes/+page.svelte';

	const { dimensions } = constants;
	let fileName = '';

	export let verticalCircles = 0;
	export let horizontalCircles = 0;
	export let data: string[];
	export let title: string;
	export let mode: 'Circles' | 'Rects';
	export let type: 'caps' | 'lotto';
	export let subTitle: string;
	export let hex: string;
	export let hexText: string;
	export let currentSize: ImageSize;
	export let orientation: Orientation;
 
	let divCavnas: HTMLDivElement;
	let imageWidth: number;
	let clientWidth: number, clientHeight: number;

	$: imageWidth =
		currentSize === 'initialSize' ? clientWidth : dimensions[currentSize]?.[orientation].width;
	$: imageHeight =
		currentSize === 'initialSize' ? clientHeight : dimensions[currentSize]?.[orientation].height;
	$: imageUnit = dimensions[currentSize]?.unit;

	$: imageDimensionsStyle = `width: ${imageWidth}${imageUnit}; height: ${imageHeight}${imageUnit}`;

	file.subscribe((file: any) => {
		if (file) {
			fileName = file.name;
		}
	});

	const convertToPng = () =>
		toBlob(divCavnas, { pixelRatio: 2 }).then(function (blob) {
			saveAs(blob!, `circles-${new Date().toDateString()}`);
		});
</script>

<main class="flex flex-col w-full justify-center gap-8 items-center p-8">
	<Button on:click={convertToPng}>Download Image</Button>
	<div class="border-black border-4 bg-white">
	<div
		bind:this={divCavnas}
		bind:clientWidth
		bind:clientHeight
		class="flex flex-col items-center p-4"
		style={`${currentSize !== 'initialSize' && imageDimensionsStyle}`}
	>
		<h1 style="color: {hexText}" class="text-5xl my-1 font-tama" dir="rtl">{title}</h1>
		<h2 style="color: {hexText}" class="text-2xl mt-2 mb-12 font-tama" dir="rtl">{subTitle}</h2>
		<div
			class="overflow-hidden min-w-0 min-h-0 w-full max-h-full grid {(verticalCircles >= 4 || horizontalCircles >= 4) ? 'gap-10' : 'gap-14'} justify-items-center"
            style="grid-template-rows: repeat({horizontalCircles}, minmax(0,1fr)); grid-template-columns: repeat({verticalCircles}, minmax(0,1fr))"
		>
			{#each { length: horizontalCircles } as _, i}
				{#each { length: verticalCircles } as _, j}
					<div
						style="border: 4px solid {hex}"
						class="{(type === 'lotto') ? `max-w-[6cm] max-h-[6cm] ${((+horizontalCircles + 2) >= +verticalCircles) ? 'h-full' : 'w-full'} aspect-square` : 'h-[4cm] w-[4cm]'} {mode === 'Circles' && 'rounded-[50%]'} flex justify-center items-center"
					>
						<svg width="100%" height="100%" viewBox="0 0 10 15">
							<text
								x="50%"
								y="50%"
								style="fill: {hexText}"
								class="font-bold font-tama align-middle"
								text-anchor="middle"
								dominant-baseline="central"
								>{data[(verticalCircles - 1 - j) + (verticalCircles * i)] ?? ''}</text
							>
						</svg>
					</div>
				{/each}
			{/each}
		</div>
	</div>
		
	</div>
</main>
