import React, {Component} from 'react'
import './SideNavStyle.css'

class SideNav extends Component{




    constructor(props) {
        super(props);
        if (props.currentUser!==null) {
            this.state = {
                currentUser: props.currentUser.id
            };
        }
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
        if (nextProps.currentUser!==null){
            this.setState({
                currentUser:nextProps.currentUser.id
            });
        }

    }

    render() {
        if (this.state!==null) {
            const defaultPic= "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png";

            const users = this.props.users.map(user => {
                let active = user.id === this.state.currentUser ? 'selected' : '';
                let img = user.imgpath === '' ? defaultPic : user.imgpath;
                return (
                    <a key={user.id} onClick={() => this.changeCurrentUser(user.id)}
                       className={"list-group-item list-group-item-action " + active}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-2">
                                    <img className="profilepic" src={img}/>
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
        }else return('')
    }
}

export default SideNav
