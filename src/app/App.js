import React, { Component } from 'react';

class App extends Component{
    constructor(){
        super();
        this.state = {
            fname: '',
            lname: '',
            email: '',
            number: '',
            contacts: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addContact = this.addContact.bind(this);
    }

    addContact(e){
        if(this.state._id){
            fetch(`/api/contacts/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                alert("Contact updated");
                this.setState({fname: '',lname: '',email: '',number: ''});
                this.fetchContacts();
            })
        }else{
            fetch('/api/contacts', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {  
                console.log(data)
                alert("Contact Save");
                this.setState({fname: '',lname: '',email: '',number: ''});
                this.fetchContacts();
            })    
            .catch(err => console.log(err))
        }

        e.preventDefault();
    }

    handleChange(e){
        const  { name,value } = e.target;
        this.setState({
            [name]:value
        });
    }

    deleteContact(id){
        if (confirm('Are you sure you want to delete this contact?')){
            fetch(`/api/contacts/${id}`, {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("Contact Delete");
                this.fetchContacts();
            });
        }
    }

    editContact(id){
        fetch(`/api/contacts/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    fname: data.fname,
                    lname: data.lname,
                    email: data.email,
                    number: data.number,
                    _id: data._id
                })
            });
    }    
    

    fetchContacts(){
        fetch('/api/contacts')
            .then(res => res.json())
            .then(data => {
                this.setState({contacts: data});
                console.log(this.state.contacts);
            });       
    }

    componentDidMount(){
        this.fetchContacts();
    }

    render(){
        return(
            <div>
                <nav className="bg-dark">
                    <div className="container text-center py-2 text-white">
                        <h3>Test Node.js & React.js Alonso Rojas</h3>  
                    </div>
                </nav>

                <div className="container pt-5">
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.addContact}>
                                        <div className="row justify-content-center">
                                            <h4 className="card-tittle text-center">Contact information</h4>
                                            <div className="form-group ">
                                                <input 
                                                    type="text" 
                                                    name="fname" 
                                                    onChange={this.handleChange} 
                                                    className="form-control" 
                                                    placeholder="Name" 
                                                    value={this.state.fname}
                                                    required/>
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="text" 
                                                    name="lname" 
                                                    onChange={this.handleChange} 
                                                    className="form-control" 
                                                    placeholder="Last Name" 
                                                    value={this.state.lname}
                                                    required/>
                                            </div>
                                            <div className="form-group ">
                                                <input 
                                                    type="Email" 
                                                    name="email" 
                                                    onChange={this.handleChange} 
                                                    className="form-control" 
                                                    placeholder="Email" 
                                                    value={this.state.email}
                                                    required/>
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="number" 
                                                    name="number" 
                                                    onChange={this.handleChange} 
                                                    className="form-control" 
                                                    placeholder="Number" 
                                                    value={this.state.number}
                                                    required/>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" class="btn btn-dark mb-2">Save Contact</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <div className="table-responsive">
                                <table class="table table-hover tabla-sm">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Number</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.contacts.map(contact => {
                                                return (
                                                    <tr key={contact._id}>
                                                        <td>{contact.fname}</td>
                                                        <td>{contact.lname}</td>
                                                        <td>{contact.email}</td>
                                                        <td>{contact.number}</td>
                                                        <td>
                                                            <button type="button" onClick={() => this.editContact(contact._id)}className="btn btn-dark btn-sm"><i class="fas fa-pen"></i></button>
                                                            <button type="button" onClick={() => this.deleteContact(contact._id)} className="btn btn-dark btn-sm mx-md-1"><i class="fas fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;