import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './Display';
import Form from './Form';

function App() {
	//URL variable
	const url = 'http://localhost:4500';
	//state to hold cookbooks
	const [cookbooks, setCookbooks] = React.useState([]);
	//empty cookbook for Form
	const emptyCookbook = {
		name: '',
		yearPublished: 2020,
	};

	//selected cookbook state
	const [selectedCookbook, setSelectedCookbook] = React.useState(emptyCookbook);

	//function to fetch cookbooks
	const getCookbooks = () => {
		fetch(url + '/api/cookbooks/')
			.then((response) => response.json())
			.then((data) => {
				setCookbooks(data);
			});
	};

	//get cookbooks on page load
	React.useEffect(() => {
		getCookbooks();
	}, []);

	//handleCreate Function for creating cookbooks
	const handleCreate = (newCookbook) => {
		fetch(url + '/api/cookbooks/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCookbook),
		}).then((response) => getCookbooks());
	};

	//handleUpdate to update a cookbook
	const handleUpdate = (cookbook) => {
		fetch(url + '/api/cookbooks/' + cookbook._id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cookbook),
		}).then((response) => getCookbooks());
	};

	//selectCookbook which selects a cookbook
	const selectCookbook = (cookbook) => {
		setSelectedCookbook(cookbook);
	};

	//deleteCookbook function to delete a cookbook
	const deleteCookbook = (cookbook) => {
		fetch(url + '/api/cookbooks' + cookbook._id, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(() => {
			getCookbooks();
		});
	};

	return (
		<div className='App'>
			<h1>Cookbook API Site</h1>
			<hr />
			<Link to='/create'>
				<button>Add Cookbook</button>
			</Link>
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => (
							<Display
								{...rp}
								cookbooks={cookbooks}
								selectCookbook={selectCookbook}
								deleteCookbook={deleteCookbook}
							/>
						)}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form
								{...rp}
								label='create'
								cookbook={emptyCookbook}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form
								{...rp}
								label='update'
								cookbook={selectCookbook}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}
export default App;
