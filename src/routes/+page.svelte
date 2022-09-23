<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
    import { file } from '$lib/stores/file';
    import ImageDisplay from '$lib/common/ImageDisplay.svelte';
	import TextInput from '$lib/common/TextInput.svelte';

    let dividers = 10; 

</script>


<h1 class="text-center text-3xl">Image Splitter</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Dropzone accept={['image/*']} multiple={false} on:drop={file.handleFileSelection} />
<TextInput bind:value={dividers} max={25} />
<ImageDisplay dividers={dividers} />
