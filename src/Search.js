import React from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI'
import BookList from './BookList';

class Search extends React.Component {
    state = {
        query: '',
        books: [],
    }
    search = (query) => {
        if (query.length !== 0) {
            search(query.toLowerCase().trim())
                .then((books) => {
                    const shelves = this.props.shelves;
                    const shelvesBooks = Object.values(shelves).flat();

                    let newBooks = !Array.isArray(books) ? [] : books.map((book) => {
                        let shelfBook = shelvesBooks.find(b => b.id === book.id);
                        if (shelfBook) {
                            return {
                                ...book,
                                shelf: shelfBook.shelf
                            }
                        }
                        return book;
                    })

                    this.setState((prevState) => ({
                        books: newBooks
                    }));
                })
        } else {
            this.setState((prevState) => ({
                books: []
            }));
        }
    }
    handleChange = (event) => {
        const {value} = event.target;
        this.setState((prevState) => ({
            query: value
        }))
        this.search(value);
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                        type="text"
                        placeholder="Search by title or author"
                        name="query"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                    </div>
                </div>
                <div className="search-books-results">
                    {Array.isArray(this.state.books) && <BookList books={this.state.books} onMove={this.props.onMove}/>}
                </div>
            </div>
        );
    }
}
export default Search;
