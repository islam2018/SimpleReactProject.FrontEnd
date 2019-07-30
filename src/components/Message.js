import React, {Component} from "react"

class Message extends Component{

    constructor() {
        super();
        this.state = {
            message: 'Welcome me!'
        };
    }

    changeText() {
        this.setState(
            {
                message: 'Changed'
            }
        );
    }

    render() {
        return (
            <div>
                <h2>{this.state.message}</h2>
                <button className="btn btn-primary" onClick={()=>this.changeText()}>Change Text!</button>
            </div>

        )
    }
}

export default Message
