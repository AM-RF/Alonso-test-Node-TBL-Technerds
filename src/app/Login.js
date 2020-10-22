import React, { Component } from 'react';

class Login extends Component{
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
                        <div className="col-md-4 col-sm-12 mx-auto">
                            <div className="card mx-auto">
                                <div className="card-body">
                                    <form>
                                        <h4 className="card-tittle text-center">Contact System</h4>
                                        <div className="form-group ">
                                            <input 
                                                type="Email" 
                                                name="email"     
                                                className="form-control" 
                                                placeholder="Email" 
                                                required/>
                                        </div>
                                        <div className="form-group">
                                            <input 
                                                type="password" 
                                                name="password" 
                                                className="form-control" 
                                                placeholder="Password" 
                                                required/>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" class="btn btn-dark mb-2">Login</button>
                                            <button type="submit" class="btn btn-dark mb-2 mx-md-2">Register</button>
                                        </div>
                                        <div className="text-center">
                                            <a href="#">Forgot password?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;