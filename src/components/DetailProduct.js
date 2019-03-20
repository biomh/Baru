import React, { Component } from 'react'
import axios from 'axios';


class DetailProduct extends Component {
    state = {
        product : {}
    }

    componentDidMount() {
        const idproduct = parseInt(this.props.match.params.asdfg)
        axios.get('http://localhost:1996/product/' + idproduct)
            .then(res => {
                this.setState({product: res.data})
            })
    }

    render() {
        const {product} = this.state
        return (
            <div className="card text-center" key={product.id}>
                <div className="card-header">
                    {product.name}
                </div>
                <div className="card-body">
                    <img className="img-detail" src={product.pict} alt={product.name} />
                    <h3 className="card-title">Product: {product.name}</h3>
                    <p className="card-text">Description: {product.desc}</p>
                    <p className="card-text">Price: Rp.{product.price}</p>
                    <a href="/" className="btn btn-primary">Add to Cart</a>
                </div>
            </div>
        )
    }
}

export default DetailProduct;