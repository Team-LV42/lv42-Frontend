import {
	selector,
	selectorFamily,
} from "recoil";

import { dateSelector } from "../hooks/useDate.jsx";
import { consoleTypeState } from "../store/state.jsx";
import { booksState } from '../store/book.jsx';

export const fetchBook = async (date) => {
	try {
		if (date === 'NaN-0NaN-0NaN') return [];
		const response = await fetch(`${process.env.REACT_APP_API_URL}/books?date=${date}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		});
		if (response.status !== 200)
			return [];
		return await response.json();
	} catch (err) {
		console.log(err);
	}	
}

export const fetchBookRecordsListQuery = selector({
	key: 'fetchBookRecordsListQuery',
	get: async ({ get }) => {
		try {
			const consoleType = get(consoleTypeState);
			const date = get(dateSelector);
			if (date === 'NaN-0NaN-0NaN') return null;
			//process.env.REACT_APP_URL
			const response = await fetch(`${process.env.REACT_APP_API_URL}/books?date=${date}&type=${consoleType}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});
			if (response.status !== 200)
				throw new Error("bookApi: failed to fetch booksRecord" + response.status);
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

// 선택된 타입의 레코드들을 불러오는데 조회를 할 수 있는 레코드들이 선택된 타입이기에 기존의
// bookState에 존재하는 레코드들을 서치해서 리턴함.
export const getRecordByBookID = selectorFamily({
	key: 'gerRecordByBookID',
	get: (bookID = null) => ({ get }) => {
		if (bookID === null)
			return null;
		const list = get(booksState);
		return list.filter((record) => record._id === bookID);
	},
});

export const deleteBookRecord = async (bookid, userid, authToken) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/books?bookId=${bookid}&userId=${userid}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`,
			},
		});
	
		if (response.status === 404) {
			console.error("failed to delete record!!!");
			return false;
		}
		return true;
	} catch (error) {
		console.error("deleteBookRecord: Error", error);
	}
};

export const postBookRecord = async (userid, data, authToken) => {
	try {
		const response = await fetch((`${process.env.REACT_APP_API_URL}/books?userId=${userid}`), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`,
			},
			body: JSON.stringify({
				"start": data.start,
				"end"  : data.end,
				"date" : data.date,
				"type" : data.consoleType,
			}),
		});
		return response;
	} catch (error) {
		console.error('postBookRecord: Error',error);
	}
};

export const patchBookRecord = async (userid, bookid, data) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/books?userId=${userid}&bookId=${bookid}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				// Token
			},
			body: JSON.stringify({
				"start": data.start,
				"end"  : data.end,
				"date" : data.date,
				"type" : data.consoleType,
			}),
		});
		return response;
	} catch (error) {
		console.error("patchBookRecord: Error", error);
	}
};

export default fetchBookRecordsListQuery;