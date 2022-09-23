// create svelte store
import { writable } from 'svelte/store';

function createFileStore() {
	const { subscribe, set } = writable(null);

	return {
		subscribe,
		handleFileSelection: (e: any) => {
			const { acceptedFiles } = e.detail;
			set(acceptedFiles[0]);
		}
	};
}

export const file = createFileStore();
