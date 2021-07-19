import React, { useContext } from 'react';
import Context from './Context';

const Cart = (props) => {
	const { list } = useContext(Context);
	const { cart } = useContext(Context);

	const getGoodsFromArr = (art) => {
		for (let i of list) {
			if (art === i.name) {
				return i;
			}
		}
	};

	let itemCart = () => {
		let out = [];

		for (let key in cart) {
			let goods = getGoodsFromArr(key);

			out.push(
				<tr key={goods.id} onClick={props.changes}>
					<td>{goods.category.name}</td>
					<td>{goods.name}</td>
					<td>{cart[key]}</td>
					<td>{`$ ${(goods.price * cart[key]).toFixed(2)}`}</td>
					<td>
						<button className="minus" data-name={goods.name}>
							-
						</button>
						<button className="plus" data-name={goods.name}>
							+
						</button>
						<button className="delete" data-name={goods.name}>
							Remove
						</button>
					</td>
				</tr>
			);
		}
		return out;
	};

	return (
		<div className="cart">
			<h1>Cart</h1>
			<table className="table table-sm table-bordered table-hover">
				<tbody>
					<tr>
						<th>Category</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
					{itemCart()}
				</tbody>
			</table>
		</div>
	);
};

export default Cart;
