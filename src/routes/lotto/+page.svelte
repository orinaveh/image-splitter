<script lang="ts">
	import Button from '$lib/common/Button.svelte';
	import CircleDisplay from '$lib/common/LottoDisplay.svelte';
	import Select from '$lib/common/Select.svelte';
	import TextInput from '$lib/common/TextInput.svelte';
	import { headers } from '$lib/stores/headers';
	import { onMount } from 'svelte';
	import ColorPicker from 'svelte-awesome-color-picker';

	onMount(() => {
		headers.set('Lotto Creator', '');
	});

	let verticalCircles = 0;
	let horizontalCircles = 0;
	let data = '';
	let mode: 'Circles' | 'Rects' = 'Circles';
	let title = '';
	let subTitle = '';
	let hex = '#000000';
	let hexText = '#000000';
	let type: 'caps' | 'lotto' = 'caps';
	$: total = horizontalCircles * verticalCircles;
</script>

<div class="grid grid-cols-4 grid-rows-2 gap-4 items-baseline">
	<TextInput bind:value={title} label="Title" placeholder="Title" />
	<TextInput bind:value={subTitle} label="Sub Title" placeholder="Sub Title" />
	<TextInput
		bind:value={verticalCircles}
		label="Vertical {mode}"
		min={0}
		placeholder="Number Of Vertical Circles"
		type="number"
	/>
	<TextInput
		bind:value={horizontalCircles}
		label="Horizontal {mode}"
		min={0}
		placeholder="Number Of Horizontal Circles"
		type="number"
	/>
	<div class="row-span-full">
		<TextInput bind:value={data} label="Data (Seperate With ,)" placeholder="Input" rows={5} />
	</div>
	<div class="row-span-full grid grid-rows-2 h-full gap-2">
		<ColorPicker bind:hex label="Border Color" />
		<ColorPicker bind:hex={hexText} label="Text Color" />
		<Button
			on:click={() => {
				mode = mode === 'Circles' ? 'Rects' : 'Circles';
			}}>{mode}</Button
		>
		<Select
			list={[
				{
					label: 'Lotto',
					value: 'lotto'
				},
				{
					label: 'Caps',
					value: 'caps'
				}
			]}
			initialSelectedItem="caps"
			bind:selectedValue={type}
		/>
	</div>
</div>
<h3 class="font-bold text-3xl">Total {mode}: {total}</h3>
<CircleDisplay
	{title}
	{mode}
	{subTitle}
	{type}
	{horizontalCircles}
	{verticalCircles}
	data={data.split(',')}
	{hex}
	{hexText}
	orientation="landscape"
	currentSize="a4"
/>
