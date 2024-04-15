import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { searchUserByPattern } from '../api/searchApi';
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
    const setInput = useSetRecoilState(inputState);
	const user = props.result.split(":");
    return (
		<div className="search-result" onClick={() => setInput(user[0])}>
			<Link to={`/user/${user[1]}`} >
				<p>{user[0]}</p>
			</Link>
		</div>
    );
};

const Search = () => {
	const { closeModal } = useModal();
	const [onInput, setOnInput] = useRecoilState(inputState);
	const [throttle, setThrottle] = useState(false);
	const [searchResult, setSearchResult] = useRecoilState(searchResultState);
	const navigate = useNavigate();
	
	const onChange = (event) => {
		if (event.target.value === '')
			setSearchResult([]);
		setOnInput(event.target.value);
	};
	
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

	const onClickDimmer = () => {
		closeModal();
		setOnInput('');
	}
	
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
	}, []);
	
	useEffect(() => {
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
		<div className="modal" id="search-modal" onClick={() => onClickDimmer()}>
			<div className="modal-content" onClick={(event) => event.stopPropagation()}>
				<div className="search-box">
					<input
						className="search-input"
						placeholder="유저명 입력"
						value={onInput}
						onChange={onChange}
						onKeyDown={HandleOnKeyPress}
					/>
					<span className="search-icon" /* onClick={} */>
						<span className="material-symbols-outlined">
							search
						</span>
					</span>
				</div>
			</div>
			{searchResult.length !== 0 && (
				<div className="search-result-list">
						{(searchResult.map((result, i) => (
							<SearchResult key={i} result={result} />
						))
					)}
				</div>
			)}
		</div>
	)
}

export default Search;