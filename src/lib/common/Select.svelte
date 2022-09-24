<script lang="ts" context="module">
	export interface ListItem {
		label: string;
		value: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import MdKeyboardArrowDown from 'svelte-icons/md/MdKeyboardArrowDown.svelte';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		ListboxLabel,
		Transition
	} from '@rgossiaux/svelte-headlessui';

	export let label = '';
	export let list: ListItem[];

	export let initialSelectedItem: string | undefined = undefined;
	export let selectedItem = list.find((item) => item.value === initialSelectedItem) ?? list[0];

	let inputProps = {
		class: [$$restProps.class]
	};

	$: classes = `relative ${inputProps.class}`;
</script>

<Listbox
	let:open
	{...$$restProps}
	value={selectedItem}
	on:change={(e) => (selectedItem = e.detail)}
	class={classes}
>
	{#if label}
		<div class="text-left w-full my-2">
			<ListboxLabel>{label}</ListboxLabel>
		</div>
	{/if}
	<div class="relative">
		<ListboxButton
			class="py-2 pl-3 pr-10 w-full text-left border-accent focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white dark:text-black  rounded bg-secondary dark:bg-secondary-dark"
			>{selectedItem?.label}</ListboxButton
		>

		<span
			class="absolute right-0 flex top-1/2 transform -translate-y-1/2 w-6 h-6 items-center pr-2 pointer-events-none text-accent"
		>
			<MdKeyboardArrowDown viewBox="0 0 20 20" />
		</span>
	</div>
	<Transition
		show={open}
		enter="transition duration-100 ease-out"
		enterFrom="transform scale-90 opacity-0"
		enterTo="transform scale-100 opacity-100"
		leave="transition duration-75 ease-out"
		leaveFrom="transform scale-100 opacity-100"
		leaveTo="transform scale-95 opacity-0"
	>
		<ListboxOptions class="absolute w-full focus:outline-none rounded mt-1">
			{#each list as item}
				<ListboxOption
					class={({ active, disabled }) =>
						`py-2 pl-3 cursor-pointer pr-10 text-left bg-secondary dark:text-black dark:bg-secondary-dark ${
							!!active && '!bg-slate-500'
						} 
                        ${!!disabled && '!bg-gray-500'}`}
					value={item}
					disabled={item.disabled}
                    let:selected
				>
					<span class={`${selected && 'font-bold'}`}>{item.label}</span>
				</ListboxOption>
			{/each}
		</ListboxOptions>
	</Transition>
</Listbox>
