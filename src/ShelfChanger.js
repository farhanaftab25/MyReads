import React from 'react';

class ShelfChanger extends React.Component {
    state = {
        shelf: ''
    }
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    render() {
        const {currentShelf} = this.props;
        return (
            <select
                onChange={this.handleChange}
                defaultValue={currentShelf}
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
