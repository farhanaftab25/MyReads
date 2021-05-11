import React from 'react';
import ShelfChanger from './ShelfChanger';

function Book(props) {
    const {book} = props;
    console.log(book);
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
                        }}></div>
                    <div className="book-shelf-changer">
                        <ShelfChanger book={book} onMove={props.onMove}/>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
        </li>
    )
}
export default Book;
