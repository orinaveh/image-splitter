<script lang="ts">
	import TiPuzzle from 'svelte-icons/ti/TiPuzzle.svelte';
	import MdHome from 'svelte-icons/md/MdHome.svelte';

    import { afterNavigate } from '$app/navigation';
	
    let base = '';

    afterNavigate((nav) => { 
        base = nav.to?.url.pathname || '';
    });


	const pages = [
		{
			label: 'Home',
			link: '/',
			icon: MdHome
		},
        {
            label: 'Lotto',
            link: '/lotto',
			icon: TiPuzzle
        }
	];
</script>

<div class="btm-nav mt-2">
	{#each pages as page}
		<a href={page.link} class="{base === page.link ? 'active' : ''}  text-accent  p-2">
			<svelte:component this={page.icon} />
            <span class="btm-nav-label">{page.label}</span>
		</a>
	{/each}
</div>
