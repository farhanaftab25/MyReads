import React from 'react';
import Book from './Book';

function BookList(props) {
    const {books} = props;
    console.log(books);
    return (
        <ol className="books-grid">
            {books.map((book) => (
                <Book key={book.id} book={book} onMove={props.onMove}/>
            ))}
        </ol>
    )
}
export default BookList;
