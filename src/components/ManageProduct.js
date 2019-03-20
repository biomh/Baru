import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class ManageProduct extends Component {
    state = {
        product: [],
        selectedID: 0
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1996/product')
            .then(res => {
                this.setState({ product: res.data, selectedID: 0 })
            })
    }
    saveEdit = (id) => {
        const name = this.editName.value
        const desc = this.editDesc.value
        const price = parseInt(this.editPrice.value)
        const pict = this.editPict.value
        axios.put(`http://localhost:1996/product/${id}`, {
            name: name,
            desc: desc,
            price: price,
            pict: pict
        }).then(() => {
            this.getProduct()
        })
    }
    editProduct = (id) => {
        this.setState({ selectedID: id })
    }
    deleteProduct = (id) => {
        axios.delete(`http://localhost:1996/product/${id}`)
            .then(res => {
                this.getProduct()
            })
    }
    onAddProduct = () => {
        const name = this.name.value
        const desc = this.desc.value
        const price = this.price.value
        const pict = this.pict.value
        this.addProduct(name, desc, price, pict)
        console.log(this.props.success);

    }
    addProduct = (name, desc, price, pict) => {
        axios.post("http://localhost:1996/product", {
            name, desc, price, pict
        }).then(res => {
            this.getProduct()
        })
    }


    renderList = () => {
        return this.state.product.map(item => {
            if (item.id !== this.state.selectedID) {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        <td>{item.price}</td>
                        <td><img className="list" src={item.pict} alt={item.desc}></img></td>
                        <td>
                            <button className="btn btn-primary mr-2" onClick={() => { this.editProduct(item.id) }}>Edit</button>
                            <button className="btn btn-danger" onClick={() => { this.deleteProduct(item.id) }}>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            <input className="form-control" ref={input => { this.editName = input }} type="text" defaultValue={item.name} />
                        </td>
                        <td>
                            <input className="form-control" ref={input => { this.editDesc = input }} type="text" defaultValue={item.desc} />
                        </td>
                        <td>
                            <input className="form-control" ref={input => { this.editPrice = input }} type="text" defaultValue={item.price} />
                        </td>
                        <td>
                            <input className="form-control" ref={input => { this.editPict = input }} type="text" defaultValue={item.pict} />
                        </td>
                        <td>
                            <button onClick={() => { this.saveEdit(item.id) }} className="btn btn-success mb-2">Save</button>
                            <button onClick={() => { this.setState({ selectedID: 0 }) }} className="btn btn-danger">Cancel</button>
                        </td>
                    </tr>
                )

            }
        })
    }


    render() {
        if (this.props.username !== '') {
            return (
                <div className="container">
                    <h1 className="display-4 text-center">Product Table</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                    <h1 className="display-4 text-center">Input Product</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                                <th scope="col"><button className="btn btn-outline-warning" onClick={this.onAddProduct}>Add</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return <Redirect to="/" />
        }
    }
}

const mapStateToProps = state => {
    return { username: state.auth.username }
}



export default connect(mapStateToProps)(ManageProduct)