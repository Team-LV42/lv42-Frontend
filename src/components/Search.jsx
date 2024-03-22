import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchUserByPattern, addDummyData } from '../api/searchApi';

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
	console.log(props.result);
	const user = props.result.split(":");
    return (
        <Link to={`/user/${user[1]}`} style={{ width: '100%' }}>
            <div onClick={() => setInput(user[0])}>
                <div  style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <p >{user[0]}</p>
                </div>
            </div>
        </Link>
    );
};



const Search = () => {
	const [onInput, setOnInput] = useRecoilState(inputState);
	const [throttle, setThrottle] = useState(false);
	const [searchResult, setSearchResult] = useRecoilState(searchResultState);
	const navigate = useNavigate();
	
	let names = '';

	const onChange = (event) => {
		if (event.target.value === '')
			setSearchResult([]);
		setOnInput(event.target.value);
	};
	
	const handleTextareaChange = (event) => {
		names = event.target.value;
	};
	
	const onClick = () => {
		console.log(names);
		names.split(',').map((name) => {
			console.log(name);
			addDummyData(name.replaceAll("\"", ""));
		})
	}
	
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
	
	useEffect(() => {
		fetchSearchResult();
	}, [onInput, setSearchResult]);
	
	const HandleOnKeyPress = e => {
		if (e.key === 'Enter') {
			const user = searchResult[0].split(":");
			navigate(`/user/${user[1]}`);
			console.log(user[0]);
		}
	  };

	return (
		<div>
			<p>input add button</p>
			<textarea id="field" rows="10" cols="30" onChange={handleTextareaChange}></textarea>
			<button value="submit" onClick={onClick}>press</button>
			<p>icon</p>
			<input
				placeholder='username'
				type='text'
				value={onInput}
				onChange={onChange}
				onKeyPress={HandleOnKeyPress}
			/>
			<div>
			{searchResult.length !== 0 && (
				searchResult.map((result, i) => (
					<SearchResult key={i} result={result} />
				))
			)}
			</div>
		</div>
	)
}

export default Search;