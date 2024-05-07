import { useEffect, useState } from 'react';

const FullLoading = () => {
	const [style, setStyle] = useState('loading');

	useEffect(() => {
		setTimeout(() => {
			setStyle('loading animate');
		}, 100);
	}, []);

	return (
		<div className="w-[calc(100dvw)] h-[calc(100dvh)] flex flex-col items-center justify-center bg-basic bg-cover md:bg-default-desktop bg-default">
			<div className="loading-container">
					<div className={style}></div>
			</div>
		</div>
	)
}

export default FullLoading;