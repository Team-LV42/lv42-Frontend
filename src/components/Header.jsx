import { atom, useRecoilState} from 'recoil';

import useSideMenu from '../hooks/useSideMenu';

export const menuState = atom({
	key: 'MenuState',
	default: false,
});

const Header = () => {
	const { onClickMenu } = useSideMenu();

	return (
		<div className="header" id="main-page">
			<div className="section" id="menu">
				<span className="material-symbols-outlined" onClick={() => onClickMenu()} id="menu-icon">
					menu
				</span>
			</div>
			<div className="section" id="logo">
				<a href="/">
					<img src="logo.svg" alt="logo" />
				</a>
			</div>
			<div className="section" id="search">
				<span className="material-symbols-outlined" id="search-icon">
					search
				</span>
			</div>
		</div>
	)
};

export default Header;