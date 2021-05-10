import React from 'react';
import BookList from './BookList';


function Shelf(props) {
    const {shelfName, books} = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ shelfName }</h2>
            <div className="bookshelf-books">
                <BookList books={books} onMove={props.onMove}/>
            </div>
        </div>
    )
}
export default Shelf;
