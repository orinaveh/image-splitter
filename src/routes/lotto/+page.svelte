<script lang="ts">
	import Button from '$lib/common/Button.svelte';
	import CircleDisplay from '$lib/common/LottoDisplay.svelte';
	import Select from '$lib/common/Select.svelte';
	import TextInput from '$lib/common/TextInput.svelte';
	import { headers } from '$lib/stores/headers';
	import { lottoInputs } from '$lib/stores/lottoInputs';
	import { onMount } from 'svelte';
	import ColorPicker from 'svelte-awesome-color-picker';

	const lottoInputsStore = lottoInputs();

	onMount(() => {
		headers.set('Lotto Creator', '');
	});
	$: total = $lottoInputsStore.horizontalCircles * $lottoInputsStore.verticalCircles;
</script>

<div class="grid grid-cols-5 grid-rows-2 gap-4 items-end">
	<TextInput
		bind:value={$lottoInputsStore.verticalCircles}
		label="Vertical {$lottoInputsStore.mode}"
		min={0}
		placeholder="Number Of Vertical Circles"
		type="number"
	/>
	<TextInput
		bind:value={$lottoInputsStore.horizontalCircles}
		label="Horizontal {$lottoInputsStore.mode}"
		min={0}
		placeholder="Number Of Horizontal Circles"
		type="number"
	/>
	<TextInput bind:value={$lottoInputsStore.subTitle} label="Sub Title" placeholder="Sub Title" />
	<TextInput bind:value={$lottoInputsStore.title} label="Title" placeholder="Title" />
	<div class="row-span-full">
		<TextInput
			bind:value={$lottoInputsStore.data}
			label="Data (Seperate With ,)"
			placeholder="Input"
			rows={5}
		/>
	</div>
	<div aria-hidden class="self-center">
		<ColorPicker bind:hex={$lottoInputsStore.hex} label="Border Color" />
	</div>
	<div aria-hidden class="self-center">
		<ColorPicker bind:hex={$lottoInputsStore.hexText} label="Text Color" />
	</div>
	<Button
		class="self-end"
		on:click={() => {
			$lottoInputsStore.mode = $lottoInputsStore.mode === 'Circles' ? 'Rects' : 'Circles';
		}}>{$lottoInputsStore.mode}</Button
	>
	<Select
		label="{$lottoInputsStore.mode} Size (Lotto Or Caps)"
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
		initialSelectedItem={$lottoInputsStore.type}
		bind:selectedValue={$lottoInputsStore.type}
	/>
</div>
<h3 class="font-bold text-3xl">Total {$lottoInputsStore.mode}: {total}</h3>
<CircleDisplay
	title={$lottoInputsStore.title}
	mode={$lottoInputsStore.mode}
	subTitle={$lottoInputsStore.subTitle}
	type={$lottoInputsStore.type}
	horizontalCircles={$lottoInputsStore.horizontalCircles}
	verticalCircles={$lottoInputsStore.verticalCircles}
	data={$lottoInputsStore.data.split(',')}
	hex={$lottoInputsStore.hex}
	hexText={$lottoInputsStore.hexText}
	orientation="landscape"
	currentSize="a4"
/>
