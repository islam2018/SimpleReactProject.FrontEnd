import React, {Component} from 'react'
import './SideNavStyle.css'

class SideNav extends Component{



    constructor(props) {
        super(props);
        this.state={
            currentUser:props.currentUser.id
        };
        console.log(this.props);

        this.changeCurrentUser = this.changeCurrentUser.bind(this)
    }

    changeCurrentUser(id) {
        console.log(id);
        this.setState({
            currentUser:id
        });
        this.props.onChangeUser(id)
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            currentUser:nextProps.currentUser.id
        });
    }

    render() {

        const users = this.props.users.map(user=>{
                let active = user.id===this.state.currentUser ? 'selected' : '';
                return (
                    <a key={user.id} onClick={()=>this.changeCurrentUser(user.id)}
                            className={"list-group-item list-group-item-action "+active}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-2">
                                    <img className="profilepic" src={user.imgpath}/>
                                </div>
                                <div className="col-xl-7 offset-1 m-auto">
                                    <h6 className="title m-auto">{user.firstname} {user.lastname}</h6>
                                    <div className="title2 m-auto">{user.email}</div>
                                </div>
                                <div className="col-xl-2 m-auto">
                                    <span className="m-auto badge badge-secondary">{user.id}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                )
        });

        return (
            <div className="list-group">
                {users}
            </div>
        )
    }
}

export default SideNav
