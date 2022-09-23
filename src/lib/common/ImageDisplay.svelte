<script lang="ts">
	import { toBlob } from 'html-to-image';
	import { saveAs } from 'file-saver';
	import { file } from '$lib/stores/file';

	let fileName = '';
	let dividers = 10;

	let divCavnas: HTMLDivElement;
	let imageWidth: number;
	function onImageLoad(e: any) { imageWidth = e.target.clientWidth; }

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
	<div bind:this={divCavnas} class="relative w-fit h-full p-8">
		<img on:load={onImageLoad} alt="upload" src={URL.createObjectURL($file)} />
		<div class="relative flex w-full justify-center pb-8">
			{#each { length: dividers } as _, i}
				<div
					style={`height: ${boxSize}px; width: ${boxSize}px`}
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
