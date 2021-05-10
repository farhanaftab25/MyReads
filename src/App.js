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
		})
	}
	addBookToShelf = (book, shelf) => {
		let newBook = {
			...book,
			shelf: shelf
		};
		this.setState((prevState) => ({
			shelves: {
				...prevState.shelves,
				[shelf]: [...prevState.shelves[shelf], newBook]
			}
		}));
	}
	removeBook = (book) => {
		const thisShelf = book.shelf;
		if (thisShelf) {
			this.setState((prevState) => ({
				shelves: {
					...prevState.shelves,
					[thisShelf]: prevState.shelves[thisShelf].filter(currentShelfBook => currentShelfBook.id !== book.id)
				}
			}));
		}
	}
	move = (book, shelf) => {
		BooksAPI.update(book, shelf)
			.then((data) => {
				if (shelf !== 'none') {
					this.addBookToShelf(book, shelf);
				}
				this.removeBook(book);
			});
	}
	render() {
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
										books={this.state.shelves['currentlyReading']}
										onMove={this.move}/>

									<Shelf
										shelfName="Want To Read"
										books={this.state.shelves['wantToRead']}
										onMove={this.move}/>

									<Shelf
										shelfName="Read"
										books={this.state.shelves['read']}
										onMove={this.move}/>
								</div>
							</div>
							<div className="open-search">
								<Link to="/search" className="button">Add a book</Link>
							</div>
						</div>
					</Route>
					<Route path="/search">
						<Search onMove={this.move} shelves={this.state.shelves}/>
					</Route>
				</Switch>

			</div>
		);
	}
}

export default BooksApp;
