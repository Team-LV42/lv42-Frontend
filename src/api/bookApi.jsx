import {
	atom,
	selector,
	selectorFamily,
} from "recoil";


import { consoleTypeState } from "../store/State.jsx";
import { dateSelector } from "../containers/Book.jsx";

const url = "http://54.180.96.16:4242/books";

export const booksState = atom({
	key:'BooksState',
	default: [],
});

// export const bookRecordsSelectorFamily = selectorFamily({
// 	key: 'BookRecordsSelectorFamily',
// 	get: (type) => ({get}) => {
// 		return get(booksState(type));
// 	},
// 	set: (type) => ({set}, newRecords) => {
// 		set((booksState(type)), newRecords);
// 	}
// });

export const fetchBookRecordsListQuery = selector({
	key: 'fetchBookRecordsListQuery',
	get: async ({ get }) => {
		try {
			const consoleType = get(consoleTypeState);
			const date = get(dateSelector);
			//process.env.REACT_APP_URL
			///books?type=" + consoleType
			const response = await fetch(`${url}?date=${date}&type=${consoleType}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});
			if (response.status !== 200)
				throw new Error("bookApi: failed to fetch booksRecord" + response.status);
			// const data = await response.json();
			// return data;
			return await response.json();
		} catch (err) {
			throw err;
		}
	}
})

export const getRecordsListByUserID = selectorFamily({
	key: 'getRecordsListByUserIDSelector',
	get: userID => ({ get }) => {
		const list = get(booksState);
		return list.filter((record) => record.user_id === userID);
	}
})

export const getRecordByBookID = (bookID) => {

}

export const booksRecordTestQuery = selector({
	key: 'BooksRecordTestQuery',
	get: () => {
		const data = [
			{
				"_id": "65e597f76857bed8e99c75f8",
				"user_id": "158085",
				"start_time": 110,
				"end_time": 111,
				"date": "2023-03-04",
				"type": 3,
				"createdAt": "2024-03-04T09:44:23.702Z",
				"updatedAt": "2024-03-04T09:44:23.702Z",
				"__v": 0
			},
			{
				"_id": "65e59838b8cf5b9111476fad",
				"user_id": "158085",
				"start_time": 111,
				"end_time": 112,
				"date": "2023-03-04",
				"type": 3,
				"createdAt": "2024-03-04T09:45:28.835Z",
				"updatedAt": "2024-03-04T09:45:28.835Z",
				"__v": 0
			}
		];
		return data;
	}
})

export default fetchBookRecordsListQuery;