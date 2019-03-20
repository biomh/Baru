import React, { Component } from "react";
import axios from "axios";

import ProductItems from "./ProductItems";

class Home extends Component {
  state = {
    products: [],
    productSearch: []
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    axios.get("http://localhost:1996/product").then(res => {
      this.setState({ products: res.data, productSearch: res.data });
    });
  };

  searchProduct = () => {
    const search = this.inputSearch.value;
    const min = parseInt(this.minPrice.value);
    const max = parseInt(this.maxPrice.value);

    var arrSearch = this.state.products.filter(item => {
      if (isNaN(min) && isNaN(max)) {
        // search hanya dengan name , min dan max kosong
        return item.name.toLowerCase().includes(search);
      } else if (isNaN(min)) {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.price <= max
        );
      } else if (isNaN(max)) {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.price >= min
        );
      } else {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.price <= max &&
          item.price >= min
        );
      }
    });

    this.setState({ productSearch: arrSearch });
  };
  sortProduct = () => {
    const sort = this.sorting.value;
    const namaAsc = this.namaAsc.value;
    const namaDesc = this.namaDesc.value;
    const priceAsc = this.priceAsc.value;
    const priceDesc = this.priceDesc.value;
    var arrSearch = this.state.products.sort((a, b) => {
      switch (sort) {
        case namaAsc:
          return a.name.toLowerCase() > b.name.toLowerCase();
        case namaDesc:
          return a.name.toLowerCase() < b.name.toLowerCase();
        case priceAsc:
          return a.price - b.price;
        case priceDesc:
          return b.price - a.price;

        default:
          break;
      }
    });
    this.setState({ productSearch: arrSearch });
    this.searchProduct();
  };
  addToCart = () => {};

  renderList = () => {
    return this.state.productSearch.map(items => {
      return <ProductItems item={items} />;
    });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9" />
          <div className="col-3">
            <p>
              Sort by{" "}
              <select ref={input => (this.sorting = input)}>
                <option
                  ref={input => (this.namaAsc = input)}
                  value="namaAsc"
                  className="text-center"
                  onClick={this.sortProduct}
                >
                  Name &uarr;
                </option>
                <option
                  ref={input => (this.namaDesc = input)}
                  value="namaDesc"
                  className="text-center"
                  onClick={this.sortProduct}
                >
                  Name &darr;
                </option>
                <option
                  ref={input => (this.priceAsc = input)}
                  value="priceAsc"
                  className="text-center"
                  onClick={this.sortProduct}
                >
                  Price &uarr;
                </option>
                <option
                  ref={input => (this.priceDesc = input)}
                  value="priceDesc"
                  className="text-center"
                  onClick={this.sortProduct}
                >
                  Price &darr;
                </option>
                <option
                  ref={input => (this.bestSeller = input)}
                  value="sale"
                  className="text-center"
                  onClick={this.sortProduct}
                >
                  Best Seller
                </option>
              </select>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-lg-2">
            <h4 className="display-4 text-center">Filter</h4>
            <div className="card p-1">
              <div className="card-header text-center">Search by Product</div>
              <div className="card-body">
                <input
                  ref={input => (this.inputSearch = input)}
                  className="form-control my-2"
                  placeholder="type here . ."
                  onKeyUp={this.searchProduct}
                />
              </div>
            </div>
            <div className="card p-1">
              <div className="card-header">Filter by Price</div>
              <div className="card-body">
                <input
                  ref={input => (this.minPrice = input)}
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  onKeyUp={this.searchProduct}
                />
                <h5 className="text-center">~</h5>
                <input
                  ref={input => (this.maxPrice = input)}
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  onKeyUp={this.searchProduct}
                />
              </div>
            </div>
            <div className="card p-1">
              <div className="card-header">Category</div>
              <div className="card-body">
                <p className="lead">
                  <input type="checkbox" value="baju" /> Besar
                </p>
                <p className="lead">
                  <input type="checkbox" value="celana" /> Sedang
                </p>
                <p className="lead">
                  <input type="checkbox" value="jaket" /> Kecil
                </p>
                <p className="lead">
                  <input type="checkbox" value="sepatu" /> 1000 KPA
                </p>
                <p className="lead">
                  <input type="checkbox" value="tas" /> 17000 KPA
                </p>
                <p className="lead">
                  <input type="checkbox" value="topi" /> Standart
                </p>
                <p className="lead">
                  <input type="checkbox" value="topi" /> Minimun
                </p>
              </div>
            </div>
          </div>
          <div className="row col-sm-8 col-lg-10">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}

export default Home;
