import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Header from './Header';
import Shelf from './Shelf';
import Search from './Search';
import { Switch, Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
	state = {
		shelves: {
			currentlyReading: [],
			wantToRead: [],
			read: []
		}
	}
	componentDidMount = () => {
		BooksAPI.getAll()
		.then((books) => {
			console.log(books);
			let shelves = {};
			books.forEach(book => {
				const shelfName = book.shelf;
				if (!shelves[shelfName]) {
					shelves[shelfName] = [book];
				} else {
					shelves[shelfName].push(book)
				}
			});
			this.setState((prevState) => ({
				shelves: shelves
			}))
			// console.log("After Mounting Getting from API" ,shelves);
		})
	}
	addBookToShelf = (book, shelf) => {
		this.setState((prevState) => ({
			shelves: {
				...prevState.shelves,
				shelf: [...prevState.shelves[shelf], book]
			}
		}));
	}
	removeBookFromShelf = (book, shelf) => {
		this.setState((prevState) => ({
			shelves: {
				...prevState.shelves,
				shelf: prevState.shelves[shelf].filter(b => b.id !== book.id)
			}
		}));
	}
	move = (book, shelf) => {

	}
	render() {
		// console.log("Getting this from State", this.state.shelves);
		return (
			<div className="app">
				<Switch>
					<Route exact path="/">
						<div className="list-books">
							<Header />
							<div className="list-books-content">
								<div>
									<Shelf
										shelfName="Currently Reading"
										books={this.state.shelves['currentlyReading']}/>

									<Shelf
										shelfName="Want To Read"
										books={this.state.shelves['wantToRead']}/>

									<Shelf
										shelfName="Read"
										books={this.state.shelves['read']}/>
								</div>
							</div>
							<div className="open-search">
								<Link to="/search" className="button">Add a book</Link>
							</div>
						</div>
					</Route>
					<Route path="/search">
						<Search />
					</Route>
				</Switch>

			</div>
		);
	}
}

export default BooksApp;
