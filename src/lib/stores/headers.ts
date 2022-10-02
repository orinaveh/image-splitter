// create svelte store
import { writable } from 'svelte/store';

function createHeadersStore() {
	const { subscribe, set } = writable({
        header: '',
        subHeader: '',
    });

	return {
		subscribe,
		set: (header: string, subHeader: string) => set({ header, subHeader }),
		reset: () => set({
			header: '',
			subHeader: '',
		})
	};
}

export const headers = createHeadersStore();
