import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { onSignupClick } from '../actions'
import { afterTwoSeconds } from '../actions'

class Register extends Component {

    onRegisterClick = () => {
        const user = this.username.value;
        const email = this.email.value;
        const pass = this.password.value;
        this.props.onSignupClick(user, email, pass)
    }
    onErrorRegister = () => {
        if (this.props.error !== '') {
            return (
                <div className="alert alert-danger mt-4 text-center">
                    {this.props.error}
                </div>
            )
        } else if (this.props.empty !== '') {
            return (
                <div className="alert alert-danger mt-4 text-center">
                    {this.props.empty}
                </div>
            )
        }
        else {
            return null
        }
    }
    onRegSuccess = () => {
        if (this.props.success !== '') {
            return (
                <div className="alert alert-success mt-4 text-center">
                    {this.props.success}
                </div>
            )
        } else {
            return null
        }
    }

    render() {

        return (
            <div className="mt-5 row">
                <div className="col-sm-6 col-md-3 mx-auto card">
                    <div className="card-body">
                        <div className="border-bottom border-secondary card-title">
                            <h1>Sign Up</h1>
                        </div>
                        <div className="card-title mt-1">
                            <h4>Username</h4>
                        </div>
                        <form className="input-group">
                            <input ref={input => { this.username = input }} className="form-control" type="text" /></form>
                        <div className="card-title mt-1">
                            <h4>Email</h4>
                        </div>
                        <form className="input-group">
                            <input ref={input => { this.email = input }} className="form-control" type="email" /></form>
                        <div className="card-title mt-1">
                            <h4>Password</h4>
                        </div>
                        <form className="input-group">
                            <input ref={input => { this.password = input }} className="form-control" type="password" />
                        </form>
                        <button className="btn btn-success btn-block mt-5"
                            onClick={this.onRegisterClick}>Sign Up</button>
                        {this.onErrorRegister()}
                        {this.onRegSuccess()}
                        {this.props.afterTwoSeconds()}
                        <p className="lead">Do you have an account ? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { error: state.auth.error, success: state.auth.success, empty: state.auth.empty }
}

export default connect(mapStateToProps, { onSignupClick, afterTwoSeconds })(Register)