import React, { useContext } from 'react';
import Cart from './Cart';

import Context from './Context';

function ProductsList() {
	const { list, setList } = useContext(Context);
	const { cart, setCart } = useContext(Context);
	let { count, setCount } = useContext(Context);

	const deleteItem = (item) => {
		let cartTemp = cart;
		delete cartTemp[item];

		setCart(cartTemp);

		setCount(Object.keys(cart).length);
	};

	const substractingItem = (item) => {
		let cartTemp = cart;
		if (cartTemp[item] < 0 || !cartTemp[item]) return false;
		cartTemp[item]--;

		if (cartTemp[item] === 0) {
			delete cartTemp[item];
		}

		setCart(cartTemp);

		setCount(--count);
		console.log(cart);
		console.log(count);
	};

	const addingItem = (item) => {
		let cartTemp = cart;
		cartTemp[item] ? cartTemp[item]++ : (cartTemp[item] = 1);

		setCart(cartTemp);

		setCount(++count);
		console.log(cart);
		console.log(count);
	};

	const addToCart = (event) => {
		event.preventDefault();

		let name = event.target.dataset.name;
		let targetClassList = event.target.classList;

		if (targetClassList.contains('minus')) {
			substractingItem(name);
		}

		if (targetClassList.contains('plus')) {
			addingItem(name);
		}

		if (targetClassList.contains('delete')) {
			deleteItem(name);
		}
	};

	let showCart;
	if (count !== 0) {
		showCart = <Cart changes={addToCart} />;
	} else {
		showCart = '';
	}

	const itemProduct = list.map((item) => (
		<tr key={item.id} onClick={addToCart}>
			<td>{item.category.name}</td>
			<td>{item.name}</td>
			<td>{`$${item.price}`}</td>
			<td>
				<button className="minus" data-name={item.name}>
					-
				</button>
				<button className="plus" data-name={item.name}>
					+
				</button>
				<button className="delete" data-name={item.name}>
					Remove
				</button>
			</td>
		</tr>
	));

	const sortingCategoriesA = () => {
		const arrList = [ ...list ].sort((a, b) => (a.category.id < b.category.id ? -1 : 1));

		setList(arrList);
	};

	const sortingCategoriesZ = () => {
		const arrList = [ ...list ].sort((a, b) => (a.category.id > b.category.id ? -1 : 1));

		setList(arrList);
	};

	const sortingPricesMax = () => {
		const priceList = [ ...list ].sort((a, b) => a.price - b.price);

		setList(priceList);
	};

	const sortingPricesMin = () => {
		const priceList = [ ...list ].sort((a, b) => b.price - a.price);

		setList(priceList);
	};

	return (
		<div className="product">
			<div>
				<h1>Products</h1>
				<table className="table table-sm table-light table-hover">
					<tbody>
						<tr>
							<th>
								{` Category `}
								<button onClick={sortingCategoriesA}>{` A `}</button>
								<button onClick={sortingCategoriesZ}>{` Z `}</button>
							</th>
							<th>Name</th>
							<th>
								{` Price `}
								<button onClick={sortingPricesMax}>min</button>
								<button onClick={sortingPricesMin}>max</button>
							</th>
							<th>Actions</th>
						</tr>
						{itemProduct}
					</tbody>
				</table>
			</div>
			{showCart}
		</div>
	);
}

export default ProductsList;
