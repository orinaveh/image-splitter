import { writable, get } from 'svelte/store';

const LOCAL_KEY = 'lottoInputs';

interface LottoInput {
	verticalCircles: number;
	horizontalCircles: number;
	data: string;
	mode: 'Circles' | 'Rects';
	title: string;
	subTitle: string;
	hex: string;
	hexText: string;
	type: 'caps' | 'lotto';
}

export function lottoInputs() {
	const store = writable<LottoInput>({
		verticalCircles: 0,
		horizontalCircles: 0,
		data: '',
		mode: 'Circles',
		title: '',
		subTitle: '',
		hex: '#000000',
		hexText: '#000000',
		type: 'caps'
	});
	const { subscribe, set } = store;
	const isBrowser = typeof window !== 'undefined';

	isBrowser &&
		localStorage.getItem(LOCAL_KEY) &&
		set(JSON.parse(localStorage.getItem(LOCAL_KEY) ?? ''));

	return {
		subscribe,
        set: (n: LottoInput) => {
            isBrowser && localStorage.setItem(LOCAL_KEY, JSON.stringify(n));
            set(n);
        },
		update: (n: Partial<LottoInput>) => {
			const updatedStore = { ...get(store), ...n };
			isBrowser && localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedStore));
			set(updatedStore);
		}
	};
}
