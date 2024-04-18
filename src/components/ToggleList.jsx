import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toggleState, getToggleContentVisibility } from '../store/toggle';

const ToggleItem = ({ title, content, index }) => {
	const [isVisible, setIsVisible] = useRecoilState(getToggleContentVisibility(index));

	const toggleVisibility = () => {
		setIsVisible((prev) => !prev);
	};

	return (
		<div className="toggle-item">
		  <div className="toggle-header" onClick={toggleVisibility}>
			<h4>{title}</h4>
			<span className="toggle-icon">{isVisible ? '-' : '+'}</span>
		  </div>
		  <div
			className={`toggle-content ${isVisible ? 'slide-in' : 'slide-out'}`}
		  >
			<p>{content}</p>
		  </div>
		</div>
	  );
};

const ToggleList = () => {
	const toggleItems = useRecoilValue(toggleState);

	return (
		<div className="toggle-list">
		{Object.keys(toggleItems).map((_, index) => (
			<ToggleItem
			key={index}
			title={toggleItems[index]?.title || `Toggle ${index + 1}`}
			content={toggleItems[index]?.content || `Toggle content ${index + 1}`}
			index={index}
			/>
		))}
		</div>
	);
};

export default ToggleList;