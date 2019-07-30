import React, {Component} from 'react'
import './MainContentStyle.css'
import deleteIcon from '../ressources/w.png'
import saveIcon from '../ressources/success.png'


class MainContent extends Component{

    constructor(props) {
        super(props);
        this.state={
            id:props.user.id,
            firstname:props.user.firstname,
            lastname:props.user.lastname,
            birthday:props.user.birthday,
            email:props.user.email,
            phone:props.user.fphone,
            adress:props.user.adress,
            imgpath: props.user.imgpath,
            file:null
        };

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

        this.setState({
            id:props.user.id,
            firstname:props.user.firstname,
            lastname:props.user.lastname,
            birthday:props.user.birthday,
            email:props.user.email,
            phone:props.user.phone,
            adress:props.user.adress,
            imgpath: props.user.imgpath,
            file:null
        });
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
        console.log(this.state);
        this.props.onEditUser(this.state);
    }

    delete() {
        console.log(this.state);
        this.props.onDeleteUser(this.state.id);
    }

    render() {
        let user = this.state;
        return  (

            <div  className="main min-vh-100">

                <div className="container p-5">
                    <div className="row m-auto">
                        <div className="col-lg-3 m-auto">
                            <div  className="imgprofile  m-auto" >
                                <input ref={input => this.inputElement = input}  id="inputFile"
                                       onChange={this.handleProfilePicChange} type="file" />
                                <img onClick={this.triggerInputFile}  src={user.imgpath}/>

                            </div>

                        </div>
                        <div className="col-lg-6 m-auto">
                            <h2 style={{'textAlign':'left'}}>{user.firstname}</h2>
                            <h2 style={{'textAlign':'left'}}>{user.lastname.toUpperCase()}</h2>
                        </div>
                        <div className="col-lg-3">

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
        )
    }
}

export default MainContent
