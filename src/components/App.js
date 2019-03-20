import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import {keepLogin} from '../actions'

import Home from './Home'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import ManageProduct from './ManageProduct'
import DetailProduct from './DetailProduct'
import ShoppingCart from './Cart'
// import ProductItems from './ProductItems'

const cookie = new cookies()


class App extends Component {

    componentDidMount(){
        var userCookie = cookie.get('stillLogin')

        if(userCookie !== undefined){
            console.log("ada");
            this.props.keepLogin(userCookie)
        }
    }

    render () {
        return (
        <BrowserRouter>
            <div>
                {/* link.contains("/login")  */}
                {/* link === "/login" */}
                <Header/>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/manageproduct" component={ManageProduct}/>
                <Route path="/detailproduct/:asdfg" component={DetailProduct}/>
                <Route path="/shoppingcart" component={ShoppingCart}/>
            </div>
        </BrowserRouter>
            
        )
    }
}




export default connect (null, {keepLogin})(App);