import React from 'react';
import Book from './Book';

function BookList(props) {
    const {books} = props;
    return (
        <ol className="books-grid">
            {books.map((book) => (
                <Book key={book.id} book={book}/>
            ))}
        </ol>
    )
}
export default BookList;
