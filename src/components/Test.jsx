import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
	useRecoilRefresher_UNSTABLE,
  } from 'recoil';

const countNumberState = atom({
	key: 'countNumberState',
	default: 40,
  });
  
const checkServerConnetableQuery = selector({
	key: 'checkServerConnetableQuery',
	get: async ({get}) => {
	  try {
		const response = await fetch("http://13.124.198.32:4242/auth", {
		  method: "GET",
		  mode: "no-cors",
		  headers: {
			"Content-Type": "application/json",
		  },
		});
		// if (!response.ok)
		//   throw new Error("can't fetch");
		return response;
	  } catch (err) {
		console.error("fetch is failed: ", err);
	  }
	},
})

function ConnectionStatus() {
	const [number, setNumber] = useRecoilState(countNumberState);
	const responseCode = useRecoilValue(checkServerConnetableQuery);
	const refreshCode = useRecoilRefresher_UNSTABLE(checkServerConnetableQuery);
	
	const onClick = (event) => {
	  setNumber(Number(event.target.value) + 1);
	};
	return (
	  <div>
		{/* {responseCode ? (responseCode) : "No response"} */}
		{console.log(responseCode)}
		<button type="button" value={number} onClick={onClick}>{number}</button>
		<button onClick={() => refreshCode()}>Refresh</button>
	</div>
	)
}

export default ConnectionStatus;