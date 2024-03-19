import {
	atom,
	selector,
	selectorFamily,
} from "recoil";


import { consoleTypeState, dateSelector } from "../store/State.jsx";

const url = "http://54.180.96.16:4242/books";

export const booksState = atom({
	key: 'BooksState',
	default: [],
});

export const fetchBookRecordsListQuery = selector({
	key: 'fetchBookRecordsListQuery',
	get: async ({ get }) => {
		try {
			const consoleType = get(consoleTypeState);
			const date = get(dateSelector);
			//process.env.REACT_APP_URL
			const response = await fetch(`${url}?date=${date}&type=${consoleType}`, {
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

export const deleteBookRecord = async (bookid, userid) => {
	try {
		const response = await fetch(`${url}?bookId=${bookid}&userId=${userid}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
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

export const postBookRecord = async (userid, data) => {
	try {
		const response = await fetch((`http://54.180.96.16:4242/books?userId=${userid}`), {
			method: "POST",
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
	
		if (response.status !== 200) {
			console.error("failed to post record");
			return ;
		}
		return response;
	} catch (error) {
		console.error('postBookRecord: Error',error);
	}
};

export const patchBookRecord = async (userid, bookid, data) => {
	try {
		const response = await fetch(`http://54.180.96.16:4242/books?userId=${userid}&bookId=${bookid}`, {
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