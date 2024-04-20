import { atom, atomFamily } from 'recoil';

/*
*	main : index
*	controller : 컨트롤러 신고
*	etc | console : 기타
*/
export const pageState = atom({
	key: 'PageState',
	default: 'main',
});

export const controllerType = atom({
	key: 'ControllerType',
	default: 0,
});

export const deviceIDState = atom({
	key: 'DeviceID',
	default: '',
});

export const deviceTypeState = atom({
	key: 'DeviceTypeState',
	default: 0,
});

/* 컨트롤러 버튼 목록: controller_btn_id */
export const btnListState = atom({
	key: 'BtnListState',
	default: [],
});

/* controller_malf_type 컨트롤러 고장 유형 */
export const malfTypeState = atom({
	key: 'MalfTypeState',
	default: [],
});

/* 컨트롤러 버튼 고장 유형 */
export const btnMalfState = atom({
	key: 'BtnMalfState',
	default: [],
});

/* 기기 총 고장 접수 목록 */
export const deviceTotalSelectedMalfList = atom({
	key: 'DeviceTotalSelectedMalfList',
	default: {
		console_type: '',
		device: '',
		controller_malf_type: '',
		controller_malf_btn_list: [],
		etc_description: '',
	},
});


/* ==================== UNSTABLE =============================*/
/* 컨트롤러 선택된(고장에 접수된) 버튼 목록 */
export const selectedBtnListState = atom({
	key: 'SelectedBtnListState',
	default: [],
});

/* controller_malf_btn_list 컨트롤러 고장난 버튼 및 유형 */
export const selectBtnMalfTypeFamily = atomFamily({
	key: 'SelectBtnMalfTypeFamily',
	default: btnType => ({ get }) => {

	}
})