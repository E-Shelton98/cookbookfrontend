import React from 'react';
//import { prependOnceListener } from "../../backend/models/cookbook";

const Display = (props) => {
	const loaded = () => (
		<div style={{ textAlign: 'center' }}>
			{props.cookbooks.map((cookbook) => (
				<article>
					<h1>{cookbook.title}</h1>
					<h3>{cookbook.yearPublished}</h3>
					<button
						onClick={() => {
							props.selectcookbook(cookbook);
							props.history.push('/edit');
						}}>
						Edit
					</button>
					<button
						onClick={() => {
							props.deletecookbook(cookbook);
						}}>
						Delete
					</button>
				</article>
			))}
		</div>
	);

	return props.cookbooks.length > 0 ? loaded() : <h1>Loading...</h1>;
};

export default Display;
