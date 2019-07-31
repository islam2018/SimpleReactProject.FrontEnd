import React , {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SideNav from './components/SideNav'
import MainContent from './components/MainContent'
import Header from './components/Header'
import UserService from './services/userService'

class App extends Component {

    userService = new UserService();
    users=[];

    constructor() {
        super();
        this.state= {
            users: [],
            currentUser: null
        };

        this.changeCurrentUser = this.changeCurrentUser.bind(this);
        this.onAppendUser = this.onAppendUser.bind(this);
        this.onEditUser = this.onEditUser.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
    }

    componentDidMount() {
        console.log("GETTING DATA");
        this.userService.getUsers().then(response=>{
            this.users = response.data;
            console.log(this.users);
            let user=null;
            if (this.users.length>0) user=this.users[0];
            this.setState({
                users:this.users,
                currentUser:user
            });
            console.log(response.data);
        }).catch(e=>{
            console.log(e);
        });
    }

    changeCurrentUser(id) {
        let cu=this.users.find(u=>{
          return u.id===id ;
        });
        console.log("hello");
        this.setState({
            currentUser:cu
        })
    }

    onAppendUser(user) {
        this.users.unshift(user);
        this.setState({
            users:this.users
        })
    }

    onEditUser(user) {
        let index=this.users.findIndex(u=>{
           return u.id === user.id
        });

        this.users[index] = user;
        this.setState({
            currentUser:this.users[index],
            users:this.users

        });
    }

    onDeleteUser(id) {
        let index=this.users.findIndex(u=>{
            return u.id === id
        });

        this.users.splice(index,1);
        this.setState({
            users:this.users,
            currentUser:this.users[index]
        });


    }

    render() {
        return (
            <div className="App">
                <Header onUserCreated={this.onAppendUser}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 ml-0 pr-0 pl-0">
                            <SideNav users={this.state.users}
                                     currentUser={this.state.currentUser}
                                     onChangeUser={this.changeCurrentUser} />
                        </div>
                        <div className="col-xl-9 mr-0 pl-0 pr-0">
                            <MainContent user={this.state.currentUser}
                                         onEditUser={this.onEditUser}
                                         onDeleteUser={this.onDeleteUser}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
