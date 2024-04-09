
// error state
const errorState = 404;

export const Error500 = () => {
	return (
		<div>
			<h1>500</h1>
			<span>이런...</span>
		</div>
	);
}

export const Error404 = () => {
	return (
		<>
			<div className="error-background-404" />
		</>
	);
}


export default Error;