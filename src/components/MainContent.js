import React, {Component} from 'react'
import './MainContentStyle.css'
import deleteIcon from '../ressources/w.png'
import saveIcon from '../ressources/success.png'
import UserService from '../services/userService'

class MainContent extends Component{

    userService = new UserService();

    constructor(props) {
        super(props);
        if (props.user!==null) {
            this.state = {
                id: props.user.id,
                firstname: props.user.firstname,
                lastname: props.user.lastname,
                birthday: props.user.birthday,
                email: props.user.email,
                phone: props.user.fphone,
                adress: props.user.adress,
                imgpath: props.user.imgpath,
                file: null,
                isLoading:false
            };
        }

        this.triggerInputFile=this.triggerInputFile.bind(this);
        this.handleProfilePicChange=this.handleProfilePicChange.bind(this);
        this.handleFirstNameChange=this.handleFirstNameChange.bind(this);
        this.handleLastNameChange=this.handleLastNameChange.bind(this);
        this.handleBirthdayChange=this.handleBirthdayChange.bind(this);
        this.handleAdressChange=this.handleAdressChange.bind(this);
        this.handlePhoneChange =   this.handlePhoneChange.bind(this);
        this.handleEmailChange =   this.handleEmailChange.bind(this);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);

    }

    componentWillReceiveProps(props) {

        if (props.user!==null) {
            this.setState({
                id: props.user.id,
                firstname: props.user.firstname,
                lastname: props.user.lastname,
                birthday: props.user.birthday,
                email: props.user.email,
                phone: props.user.phone,
                adress: props.user.adress,
                imgpath: props.user.imgpath,
                file: null,
                isLoading:false
            });
        }
    }

    handleProfilePicChange(event) {
        const file = this.inputElement.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.setState({
                imgpath:reader.result,
                file:file
            });
        };
    }


    triggerInputFile(e) {
        this.inputElement.click();
    }

    handleFirstNameChange(event) {
        this.setState({
            firstname:event.target.value
        })
    }

    handleLastNameChange(event) {
        this.setState({
            lastname:event.target.value
        })
    }
    handleBirthdayChange(event) {
        this.setState({
            birthday:event.target.value
        })
    }
    handlePhoneChange(event) {
        this.setState({
            phone:event.target.value
        })
    }
    handleEmailChange(event) {
        this.setState({
            email:event.target.value
        })
    }
    handleAdressChange(event) {
        this.setState({
            adress:event.target.value
        })
    }

    submit() {
        this.setState({isLoading:true});
        this.userService.updateUser({
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthday: this.state.birthday,
            email: this.state.email,
            phone: this.state.phone,
            adress: this.state.adress,
            imgpath: this.state.imgpath,
        }).then(response=>{
            if (this.state.file!==null) {
                let id = response.data.id;
                this.userService.uploadPicture(id,this.state.file).then(res=>{
                    this.setState({isLoading:false});
                    this.props.onEditUser(res.data);
                }).catch (error=>{
                    console.log(error);
                });
            }else {
                this.setState({isLoading:false});
                this.props.onEditUser(response.data);
            }

        }).catch(e=>{
            console.log(e);
        });
    }



    delete() {
        this.setState({isLoading:true});
        this.userService.deleteUser(this.state.id).then(r=>{
            this.setState({isLoading:false});
            this.props.onDeleteUser(this.state.id);
        }).catch(e=>{});
    }

    render() {
        let user = this.state;
        const defaultPic= "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png";
        let img = defaultPic;
        if (user!=null && user.imgpath!=="")  img = user.imgpath ;
        return  ( user!==null ? (
            <div  className="main min-vh-100">

                <div className="container p-5">
                    <div className="row m-auto">
                        <div className="col-lg-3 m-auto">
                            <div  className="imgprofile  m-auto" >
                                <input ref={input => this.inputElement = input}  id="inputFile"
                                       onChange={this.handleProfilePicChange} type="file" />
                                <img onClick={this.triggerInputFile}  src={img}/>

                            </div>

                        </div>
                        <div className="col-lg-6 m-auto">
                            <h2 style={{'textAlign':'left'}}>{user.firstname}</h2>
                            <h2 style={{'textAlign':'left'}}>{user.lastname.toUpperCase()}</h2>
                        </div>
                        <div className="col-lg-3 m-auto">
                            {
                                this.state.isLoading ? (
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : ''
                            }

                        </div>
                    </div>
                    <div className="row m-auto">
                        <div className="col-lg-3 m-auto">

                        </div>
                        <div className="col-lg-6 m-auto">

                            <form style={{'textAlign':'left'}}>

                                <div className="form-group">
                                    <label htmlFor="InputNom">Nom</label>
                                    <input type="text" className="form-control" id="InputNom"
                                           onChange={this.handleLastNameChange}
                                           aria-describedby="emailHelp" value={user.lastname}/>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="InputPrenom">Prénom</label>
                                    <input type="text" className="form-control" id="InputPrenom"
                                           onChange={this.handleFirstNameChange}
                                           aria-describedby="emailHelp" value={user.firstname}/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputBirthday">Date de naissance</label>
                                    <input type="date" className="form-control" id="InputBirthday"
                                           onChange={this.handleBirthdayChange}
                                           aria-describedby="emailHelp" value={user.birthday}/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputAdress">Adresse</label>
                                    <input type="text" className="form-control small" id="InputAdres"
                                           onChange={this.handleAdressChange}
                                           aria-describedby="emailHelp" value={user.adress}/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputEmail">Adresse mail</label>
                                    <input type="email" className="form-control" id="InputEmail"
                                           onChange={this.handleEmailChange}
                                           aria-describedby="emailHelp" value={user.email}/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputPhone">Numero téléphone</label>
                                    <input type="number" className="form-control" id="InputPhone"
                                           onChange={this.handlePhoneChange}
                                           aria-describedby="emailHelp" value={user.phone}/>

                                </div>

                            </form>
                        </div>
                        <div className="col-lg-3">
                            <div>
                                <a type="button"  data-toggle="modal" data-target="#exampleModal1">
                                    <img className="icon"  src={deleteIcon}/>
                                </a>

                                <p>Supprimer</p>
                            </div>
                            <br/>
                            <div>
                                <img className="icon" onClick={this.submit} src={saveIcon}/>
                                <p>Sauvegarder</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{'textAlign':'left'}}>
                                Etes vous sur de vouloir supprimer cet utilisateur ?!
                            </div>
                            <div className="modal-footer">
                                <button  type="button" className="btn btn-outline-secondary" data-dismiss="modal">Non</button>
                                <button onClick={this.delete} type="button" data-dismiss="modal" className="btn btn-danger">Oui</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : '')
    }
}

export default MainContent;
