import { atom, selector, selectorFamily } from 'recoil';

import { fetchBook } from '../api/book';
import { dateSelector } from '../hooks/useDate';

export const booksState = atom({
	key: 'BooksState',
	default: {
		init: false,
		1: Array(48).fill(null), // xbox
		2: Array(48).fill(null), // switch
		3: Array(48).fill(null), // ps5
	},
});

export const selectState = atom({
	key: 'selectState',
	default: {
		s: -1,
		e: -1,
	},
});

export const initialBooksSelector = selector({
	key: 'initialBooksSelector',
	get: async ({ get }) => {
		const today = get(dateSelector);
		const books = get(booksState);
		
		if (books.init) {
			return books;
		}
		const initialData = await fetchBook(today);

		const initialBooks = initialData.length !== 0 && {
			init: true,
			1: books[1].map((_, index) => {
			const bookData = initialData.find((record) => record.type === 1 && record.start_time <= index && record.end_time >= index);
			return bookData || null;
			}),
			2: books[2].map((_, index) => {
			const bookData = initialData.find((record) => record.type === 2 && record.start_time <= index && record.end_time >= index);
			return bookData || null;
			}),
			3: books[3].map((_, index) => {
			const bookData = initialData.find((record) => record.type === 3 && record.start_time <= index && record.end_time >= index);
			return bookData || null;
			}),
		};

		return initialBooks;
	},
	set: ({ set }, newBooks) => set(booksState, newBooks),
});

export const bookSelector = selectorFamily({
	key: 'bookSelector',
	get: (params) => ({ get }) => get(booksState)[params.type][params.index],
	set: (params) => ({ set, get }, newValue) => {
	const books = get(booksState);
	const updatedBooks = {
		...books,
		[params.type]: [...books[params.type]],
	};
	updatedBooks[params.type][params.index] = newValue;
	set(booksState, updatedBooks);
	},
});