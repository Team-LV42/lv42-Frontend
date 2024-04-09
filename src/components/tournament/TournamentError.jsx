export const T404 = () => {
	return (
		<div className="main flex-column-center">
			<div className="error-main">
			<div className="error-code">
				<p>404</p>
			</div>
			<div className="error-status">
				<p>NOT FOUND</p>
			</div>
			</div>
		</div>
	)
}

export const T500 = () => {
	return (
		<div className="main flex-column-center">
			<div className="error-main">
				<div className="error-code">
					<p>500</p>
				</div>
				<div className="error-status">
					<p>OOPS</p>
				</div>
			</div>
		</div>
	)
}