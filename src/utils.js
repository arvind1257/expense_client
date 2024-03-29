import { useState, useEffect } from 'react';

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
}

function getCustomDimensions(element) {
	
	let width1 = element.current?element.current.offsetWidth:0;
	let height1 = element.current?element.current.offsetHeight:0;
	console.log(width1,height1)
	return {
		width1,
		height1
	}
}

export function useCustomDimensions(element) {
	const [customDimensions, setCustomDimensions] = useState(getCustomDimensions(element));
	console.log(element.current)
	useEffect(() => {
		function handleResize() {
			setCustomDimensions(getCustomDimensions(element));
		}
		if(element.current){
			element.current.addEventListener('resize1', handleResize);
			return () => element.current.removeEventListener('resize1', handleResize);
		}
		
	}, [element]);

	console.log(customDimensions)
	return customDimensions;
}

const ContextMenu = ({ parent,menuItems, clickedMenu }) => {
	// Changed to position as one state reddit feedback
	const [position, setPosition] = useState();
  
	useEffect(() => {
	  const registerRightClick = (e) => {
		console.log(parent.current)
		if(parent.current.contains(e.target)){
			e.preventDefault();
			setPosition({ top: e.clientY, left: e.clientX });
		}
	  };
	  const clickAnywhere = () => {
		setPosition(undefined);
	  };
	  document.addEventListener("contextmenu", registerRightClick);
	  document.addEventListener("click", clickAnywhere);
	  return () => {
		document.removeEventListener("contextmenu", registerRightClick);
		document.removeEventListener("click", clickAnywhere);
	  };
	}, [parent]);
  
	return (
	  <>
		{position && (
		  <ul
			id="content-menu"
			style={{
			  left: `${position.left}px`,
			  top: `${position.top}px`
			}}
		  >
			{/* Changed to menuItem from i reddit feedback */}
			{menuItems.map((menuItem) => {
			  return (
				<li onClick={() => clickedMenu(menuItem)} key={menuItem}>
				  {menuItem}
				</li>
			  );
			})}
		  </ul>
		)}
	  </>
	);
  };
  
  export default ContextMenu;