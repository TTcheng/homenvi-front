import React from 'react';
import './CountButton.css';

class CountButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    countUp() {
        const {value} = this.state;
        this.setState({value: value + 1});
    }

    render() {
        return (
            <button className="count-button" onClick={() => this.countUp()}>
                你点击了{this.state.value}次！
            </button>
        );
    }
}

export default CountButton;
