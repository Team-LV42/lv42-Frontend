import { atom, useRecoilState} from 'recoil';
import { useEffect, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { searchUserByPattern } from '../api/search';
import useModal from '../hooks/useModal';

const searchResultState = atom({
	key: 'SearchResultState',
	default: [],
})

const inputState = atom({
	key: 'InputState',
	default: '',
})

const SearchResult = (props) => {
	const navigate = useNavigate();
	const user = props.result.split(":");

    return (
		<li onClick={() => navigate(`/user/${user[1]}`)} class="w-full h-14 flex flex-row items-center justify-between text-[#6E6E73] cursor-pointer hover:brightness-50">
			<p class="font-semibold text-lg">{user[0]}</p>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
			</svg>
		</li>
    );
};

const Search = () => {
	const { isopen, modalDataState, closeModal } = useModal();
	const [onInput, setOnInput] = useRecoilState(inputState);
	const [searchResult, setSearchResult] = useRecoilState(searchResultState);
	const navigate = useNavigate();
	
	const onChange = (event) => {
		if (event.target.value === '')
			setSearchResult([]);
		setOnInput(event.target.value);
	};

	const onClickDimmer = useCallback(() => {
		closeModal();
		setOnInput('');
	}, [closeModal, setOnInput]);
	
	useEffect(() => {
		const handleEscKey = e => {
			if (e.key === 'Escape') {
				onClickDimmer();
				setOnInput('');
			}
		};

		window.addEventListener('keydown', handleEscKey);

		return () => {
			window.removeEventListener('keydown', handleEscKey);
		}
	}, [onClickDimmer, setOnInput]);
	
	useEffect(() => {
		const fetchSearchResult = async () => {
			try {
				if (onInput === '') {
					setSearchResult([]);
					return ;
				}
				const result = await searchUserByPattern(onInput);
				setSearchResult(result);
			} catch (error) {
				console.error('Error fetching search result', error);
			}
		};

		fetchSearchResult();
	}, [onInput, setSearchResult]);

	
	const HandleOnKeyPress = e => {
		if (e.key === 'Enter') {
			if (searchResult.length !== 0) {
				const user = searchResult[0].split(":");
				navigate(`/user/${user[1]}`);
			}
			onClickDimmer();
			setOnInput('');
		}
	  };

	return (
		<div
		id="search"
		onClick={onClickDimmer}
		class={`${isopen && modalDataState.type === 'search' ? 'search-shown' : 'search-hidden'} fixed w-full top-0 left-0 flex flex-col items-center justify-start bg-white z-40 transition-all ease-[cubic-bezier(.4,0,.6,1)] duration-300 overflow-hidden`}
		>
			{/* <!-- 검색화면 내부 헤더 --> */}
			<header onClick={(event) => event.stopPropagation()} class="w-full h-12 flex flex-row items-center justify-end p-4 top-0 left-0">
				{/* <!-- 검색화면 닫기 버튼 --> */}
				<button id="search-close-button" class="z-40" onClick={onClickDimmer}>
					<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</header>
			{/* <!-- 검색창 --> */}
			<div onClick={(event) => {event.stopPropagation()}} class="w-80 h-14 flex items-center justify-between border border-[#848586] mt-10 mb-3 px-4 rounded-2xl">
				<input
				value={onInput}
				onChange={onChange}
				onKeyDown={HandleOnKeyPress}
				type="text"
				maxLength="15"
				placeholder="유저 검색"
				class="w-4/5 h-10 focus:outline-none text-lg font-semibold text-[#6E6E73]"
				/>
				<svg class="w-7 h-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#848586">
					<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
				</svg>
			</div>
			{/* <!-- 검색 결과 목록 --> */}
			<ul class="w-72">
				{searchResult.length !== 0 && (
					<div className="search-result-list">
							{(searchResult.map((result, i) => (
								<SearchResult key={i} result={result} />
							))
						)}
					</div>
				)}
			</ul>
		</div>
	)
}

export default Search;