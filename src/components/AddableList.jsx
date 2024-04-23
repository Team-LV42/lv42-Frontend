import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getAddableContent } from '../store/addable';
import { setSelected } from '../api/reportApi';
import { deviceTotalSelectedMalfList } from '../store/report';
import { btnListState, btnMalfState } from '../store/report';

const AddableItem = ({index, btnList, btnMalfTypeList }) => {
	const [content, setContent] = useRecoilState(getAddableContent(index));
	const [selectBtnisVisible, setSelectBtnisVisible] = useState(false);
	const [selectBtnMalfunisVisible, setSelectBtnMalfunisVisible] = useState(false);
	
	const button1Ref = useRef(null);
	const button2Ref = useRef(null);

	const onSet = (name, id) => {
		setContent((prev) => ({
			...prev,
			[name]: id,
		}))
	}

	const btnName = (id) => {
		if (id === 0) return '버튼 선택';
		const btn = btnList.find((item) => item.id === id);
		if (btn !== undefined)
			return btn.name;
		else
			return id;
	}

	const btnMalfTypeName = (type) => {
		if (type === '') return '타입 선택';
		const malf = btnMalfTypeList.find((malf) => malf.name === type);
		if (malf !== undefined)
			return malf.description;
		else
			return type;
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
		  if (button1Ref.current && !button1Ref.current.contains(event.target)) {
			setSelectBtnisVisible(false);
		  }
		  if (button2Ref.current && !button2Ref.current.contains(event.target)) {
			setSelectBtnMalfunisVisible(false);
		  }
		};
	
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
		  document.removeEventListener('mousedown', handleClickOutside);
		};
	  }, []);

	const deleteItem = () => {
		setContent();
	};

	return (
		<>
		<div key={index} className="relative flex flex-row items-center justify-center w-full p-2">
			<button
			ref={button1Ref}
			onClick={() => setSelectBtnisVisible((prev) => !prev)}
			className="group md:text-lg flex flex-row items-center justify-around text-center md:w-44 w-20 mx-1 md:h-12 h-9 border border-black pointerhover:hover:bg-gray-300 rounded p-2"
			>
				<p className="inline">
					{btnName(content.controller_btn_id)}
				</p>
				<div onClick={(e) => {e.preventDefault();e.stopPropagation();}} className={`${selectBtnisVisible ? 'visible' : 'invisible'} grid gap-2 grid-rows-4 grid-cols-5 p-4 absolute md:top-[3.6rem] top-11 left-0 w-full md:h-60 h-44 bg-gray-200 border border-black rounded-md z-50 shadow-md`}>
				{btnList.map((btn, index) => (
					<span
					key={btn.id}
					onClick={() => {
						onSet('controller_btn_id', btn.id);
						setSelectBtnisVisible(false);
					}} 
					className="md:w-full md:h-12 w-14 h-8 rounded-md border bg-white pointerhover:hover:bg-gray-300 border-gray-500 flex items-center justify-center"
					>
						{btn.name}
					</span>
				))}
				</div>
			</button>
			<button
			ref={button2Ref}
			onClick={() => setSelectBtnMalfunisVisible((prev) => !prev)}
			className="group md:text-lg flex flex-row items-center justify-around grow mx-1 md:h-12 h-9 border border-black pointerhover:hover:bg-gray-300 rounded p-2"
			>
				<p className="inline">
					{btnMalfTypeName(content.controller_btn_malf_type)}
				</p>
				<div onClick={(e) => {e.preventDefault();e.stopPropagation();}} className={`${selectBtnMalfunisVisible ? 'visible' : 'invisible'} flex-col items-center justify-center p-4 absolute md:top-[3.6rem] top-11 left-0 w-full bg-gray-200 border border-black rounded-md z-50 shadow-md`}>
					{ btnMalfTypeList.map((malf, index) => (
						<span
						key={malf.id}
						onClick={() => {
							onSet('controller_btn_malf_type', malf.name);
							setSelectBtnMalfunisVisible(false);
						}}
						className="w-full my-1 md:h-12 h-8 rounded-md border bg-white pointerhover:hover:bg-gray-300 border-gray-500 flex items-center justify-start px-2"
						>
							{malf.description}
						</span>
					))}
					<span
					onClick={() => {
						onSet('controller_btn_malf_type', '기타');
						setSelectBtnMalfunisVisible(false);
					}}
					className="w-full my-1 md:h-12 h-8 rounded-md border bg-whit타 pointerhover:hover:bg-gray-300 border-gray-500 flex items-center justify-start px-2"
					>
						기타
					</span>
					{/* <input
					ref={button2Ref}
					type="text"
					maxLength="15"
					placeholder="직접입력"
					onBlur={(event) => {
						onSet('controller_btn_malf_type', event.target.value);
						setSelectBtnMalfunisVisible(false);
					}}
					className="w-full my-1 md:h-12 h-8 rounded-md border border-gray-500 flex items-center justify-start px-2"
					></input> */}
				</div>
			</button>
			<button onClick={deleteItem} className="flex items-center justify-center p-2">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					</svg>
			</button>
		</div>
		</>
	  );
};

const AddableList = () => {
	const items = useRecoilValue(deviceTotalSelectedMalfList).controller_malf_btn_list;
	const setSelect = useSetRecoilState(setSelected);

	const btnList = useRecoilValue(btnListState);
	const btnMalfTypeList = useRecoilValue(btnMalfState);

	const addItem = () => {
		setSelect({
			name: 'controller_malf_btn_list',
			value:{
				'controller_btn_id': 0,
				'controller_btn_malf_type': '',
			}});
	};

	useEffect(() => {
		if (items.length === 0)
			addItem();
	}, []);

	return (
		<div id="btn-malf-list" className="w-full flex flex-col items-around justify-around text-sm">
		{Object.keys(items).map((_, index) => (
			<AddableItem
			key={index}
			index={index}
			btnList={btnList}
			btnMalfTypeList={btnMalfTypeList}
			/>
		))}
			<div id="add-malf" className="flex flex-row items-center justify-center w-full p-2">
				<button onClick={addItem} className="flex flex-row items-center justify-around text-center w-full mx-1 md:h-12 h-9 border border-black button-inactive pointerhover:hover:bg-gray-300 rounded p-2">
					<p className="text-lg inline">+</p>
				</button>
			</div>
		</div>
	);
};

export default AddableList;