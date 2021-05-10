import React from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI'
import BookList from './BookList';

class Search extends React.Component {
    state = {
        query: '',
        books: [],
    }
    handleChange = (event) => {
        const {value} = event.target;
        this.setState((prevState) => ({
            query: value
        }))
    }

    render() {
        const {query} = this.state;
        search(query.toLowerCase().trim())
            .then((books) => {
                this.setState((prevState) => ({
                    books: books
                }))
            })
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
