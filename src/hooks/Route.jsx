import { atom, useRecoilState } from 'recoil';
import { isValidElement, useContext, createContext, useState } from 'react';

export const routerContext = createContext({
	path: "",
	changePath: () => undefined,
});

export const pathState = atom({
	key: 'pathState',
	default: '',
})

routerContext.displayName = "RouterContext";

export const Link = ({to, child}) => {
	const { changePath } = useContext(routerContext)

	const handleClick = e => {
		e.preventDefault();
		changePath(to);
	}
	return (
		<a href={to} onClick={handleClick}>
			{child}
		</a>
	);
};
export const Routes = ({ children }) => {
	const { path } = useContext(routerContext);
	
	let element = null;
	children.forEach(children, child => {
		console.log(element);
		if (!isValidElement(child))
			return ;
		if (!child.props.path || !child.props.element)
			return ;
		if (child.props.path !== path)
			return ;
		element = child.props.element;
	})
	return element;
};

export const Route = () => null;

export const Router = ({ child }) => {
	const [path, setPath] = useState(window.location.pathname);
	const changePath = path => {
		setPath(path);
		// window.history.pushState("", "", path);
	}

	const contextValue = {
		path,
		changePath,
	};

	return (
		<routerContext.Provider value={contextValue}>
			{child}
		</routerContext.Provider>
	);
};

export default Router;