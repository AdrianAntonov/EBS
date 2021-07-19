import React, { useState, useEffect } from 'react';
import Context from './Context';
import data from './data';
import ProductsList from './ProductsList';

function App() {
	const [ list, setList ] = useState(data.data);
	const [ cart, setCart ] = useState({});
	const [ count, setCount ] = useState(0);

	// useEffect(() => {
	// 	const search = async () => {
	// 		const res = await fetch('/data.js');
	// 		console.log(res);
	// 		const dataList = await res.json();
	// 		console.log(dataList);
	// 		setList(dataList);
	// 	};
	// 	search();
	// 	console.log('iaca si eu');
	// }, []);

	return (
		<Context.Provider value={{ list, setList, cart, setCart, count, setCount }}>
			<ProductsList />
		</Context.Provider>
	);
}

export default App;
