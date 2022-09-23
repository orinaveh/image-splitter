<script lang="ts">
	import { toBlob } from 'html-to-image';
	import { saveAs } from 'file-saver';
	import { file } from '$lib/stores/file';

	let fileName = '';
	export let dividers = 10;

	let divCavnas: HTMLDivElement;
	let imageWidth: number;
	function onImageLoad(e: any) { imageWidth = e.target.width; }

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

{#if $file}
	<div bind:this={divCavnas} class="relative w-max max-w-full h-full p-8">
		<img class="w-full h-full" on:load={onImageLoad} alt="upload" src={URL.createObjectURL($file)} />
		<div class="relative flex w-full justify-center">
			{#each { length: dividers } as _, i}
				<div
					style={`height: ${Math.min(boxSize, 100)}px; width: ${boxSize}px`}
					class="flex justify-center items-center border-y-4 border-x-2 border-black first:border-l-4 last:border-r-4"
				>
					<span class="font-bold text-3xl text-center">{i + 1}</span>
				</div>
			{/each}
		</div>
	</div>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		on:click={convertToPng}>Convert to PNG</button
	>
{/if}
