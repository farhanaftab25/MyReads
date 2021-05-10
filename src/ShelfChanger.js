import React from 'react';

class ShelfChanger extends React.Component {
    state = {
        shelf: ''
    }
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState((prevState) => ({
            [name]: value
        }));
        if (this.props.onMove) {
            this.props.onMove(this.props.book, value);
        }
    }

    render() {
        const {book} = this.props;
        console.log(book);
        // console.log("Yes running");
        return (
            <select
                onChange={this.handleChange}
                defaultValue={book.shelf}
                name='shelf'>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        )
    }
}
export default ShelfChanger;
