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