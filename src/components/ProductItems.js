import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';


class ProductItems extends Component {
    addToCart = () =>{
        const {item} = this.props
        const {username} = this.props.user
        axios.get("http://localhost:1996/shoppingcart", {
            params : {
                idproduct:item.id
            }
        }).then(res => {
            console.log(res.data);  
            if(res.data.length === 0){
                axios.post("http://localhost:1996/shoppingcart", {
                    idproduct: item.id,
                    username: username,
                    name: item.name,
                    desc: item.desc,
                    price: item.price,
                    pict: item.pict,
                    qty: parseInt(this.qty.value)
                }).then(res => {
                    console.log("success");
                })     
            }else{
                axios.put("http://localhost:1996/shoppingcart/" +res.data[0].id,{
                    idproduct: item.id,
                    username: username,
                    name: item.name,
                    desc: item.desc,
                    price: item.price,
                    pict: item.pict,
                    qty : res.data[0].qty + parseInt(this.qty.value)
                }).then(res =>{
                    console.log("succes put");
                    
                })
                
            }
        })
    }

    render () {
        const {item} = this.props
        return (
            <div className="card col-sm-5 col-lg-3 m-3" style={{ width: "18rem" }} key={item.id}>
                <img src={item.pict} className="card-img-top mx-auto mt-3" alt={item.name} />
                <div className="card-body mx-auto">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.desc}</p>
                    <p className="card-text">Rp.{item.price}</p>
                    <input ref={input => this.qty = input} className="form-control" type="number" />
                    <Link to={"/detailproduct/" + item.id}><button className="btn btn-secondary btn-block btn-sm my-2">Detail</button></Link>
                    <button onClick={this.addToCart} className="btn btn-primary btn-block btn-sm my-2">Add to Cart</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { user: state.auth }
}

export default connect(mapStateToProps)(ProductItems)