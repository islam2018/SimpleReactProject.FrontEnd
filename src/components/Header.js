import React, {Component} from 'react'
import './HeaderStyle.css'
import upload from '../ressources/upload.png'
import UserService from '../services/userService'

class Header extends Component{

    userService = new UserService();

    constructor(props){
        super(props);
        this.state={
            firstname:'',
            lastname:'',
            birthday:'',
            email:'',
            phone:'',
            adress:'',
            imgpath:upload,
            file:null,
            isLoading:false
        };
        this.triggerInputFile=this.triggerInputFile.bind(this);
        this.handleFirstNameChange=this.handleFirstNameChange.bind(this);
        this.handleLastNameChange=this.handleLastNameChange.bind(this);
        this.handleBirthdayChange=this.handleBirthdayChange.bind(this);
        this.handleAdressChange=this.handleAdressChange.bind(this);
        this.handlePhoneChange =   this.handlePhoneChange.bind(this);
        this.handleEmailChange =   this.handleEmailChange.bind(this);
        this.handleProfilePicChange=this.handleProfilePicChange.bind(this);
        this.submit=this.submit.bind(this);
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
        this.userService.newUser(this.state).then(response=>{
            if (this.state.file!==null) {
                let newId = response.data.id;
                this.userService.uploadPicture(newId,this.state.file).then(res=>{
                    this.setState({isLoading:false});
                    this.props.onUserCreated(res.data);
                    this.closeButton.click();
                    this.setState({file:null});
                }).catch (error=>{
                    console.log(error);
                });
            }else {
                this.setState({isLoading:false});
                this.closeButton.click();
                this.setState({file:null});
                this.props.onUserCreated(response.data);
            }

        }).catch(e=>{
            console.log(e);
        });
        console.log(this.state);
    }


    render() {
        return (
            <div className="header m-auto">
               <div className="container-fluid ">
                   <div className="row mt-auto mb-auto ">
                       <div className="col-lg-4 ">
                           <h3 className="titre mt-3">Gestion des utilisateurs</h3>
                       </div>
                       <div className="col-lg-6 mt-auto mb-auto ">

                       </div>
                       <div className="col-lg-2 p-0 m-0">
                           <button className="btn btn-primary ml-0 p-2 mt-2" type="button"  data-toggle="modal" data-target="#exampleModal"> Nouvelle utilisateur</button>
                       </div>
                   </div>
               </div>
                <div className="modal fade"   id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Nouvel utilisateur</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form style={{'textAlign':'left'}}>

                                    <div className="row">
                                        <div className="col-lg-9">
                                            <div className="form-group">

                                                <input type="text" className="form-control" id="InputNom"
                                                       onChange={this.handleLastNameChange}
                                                       aria-describedby="emailHelp" placeholder="Votre nom"/>

                                            </div>

                                            <div className="form-group">

                                                <input type="text" className="form-control" id="InputPrenom"
                                                       onChange={this.handleFirstNameChange}
                                                       aria-describedby="emailHelp"  placeholder="Votre prénom"/>

                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div onClick={this.triggerInputFile} className="uploadPic m-auto">
                                                <input ref={input => this.inputElement = input}  id="inputFile"
                                                       onChange={this.handleProfilePicChange} type="file" />
                                                <img className="m-auto" src={this.state.imgpath}/>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <small >Date de naissance</small>
                                        <input type="date" className="form-control" id="InputBirthday"
                                               onChange={this.handleBirthdayChange}
                                               aria-describedby="emailHelp"  />

                                    </div>
                                    <div className="form-group">

                                        <input type="text" className="form-control small" id="InputAdres"
                                               onChange={this.handleAdressChange}
                                               aria-describedby="emailHelp"  placeholder="Votre adresse"/>

                                    </div>
                                    <div className="form-group">

                                        <input type="email" className="form-control" id="InputEmail"
                                               onChange={this.handleEmailChange}
                                               aria-describedby="emailHelp" placeholder="Votre adresse mail"/>

                                    </div>
                                    <div className="form-group">

                                        <input type="number" className="form-control" id="InputPhone"
                                               onChange={this.handlePhoneChange}
                                               aria-describedby="emailHelp"  placeholder="Votre numero telephone"
                                               />

                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                        ref={close=> this.closeButton =close}
                                        className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                <button type="button" disabled={this.state.isLoading}

                                        onClick={this.submit} className="btn btn-primary">
                                    {
                                        this.state.isLoading ? (
                                            <span className="spinner-border spinner-border-sm" role="status"
                                                                      aria-hidden="true"/>
                                        ) : ''
                                    }

                                    Sauvegarder</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
