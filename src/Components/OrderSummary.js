import React from 'react';
import axios from 'axios';

class orderSummary extends React.Component {
    constructor(){
        super();
        this.state = {
            total: "",
            cart: "",
            ongkir: "",
            subTotal: ""
        }
    }

    // untuk dapetin userID buat dapetin city_id nya, untuk dapet ongkirnya dari API Raja Ongkir
    componentDidMount(){
        this.setState({isLoading: true})

        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")

        // get data user from database
        axios.get(`http://localhost:2018/users/${userID}`).then((x) => {
            // console.log(x.data[0])
            console.log(x.data[0])

            // get ongkir berdasarkan city_id
            this.getOngkir(x.data[0].city);
            this.setState({
                province_id: x.data[0].province,
                city_id: x.data[0].city,
                dataUser: x.data[0],
                isLoading: false
            })
        }).catch((x) => {
            console.log(x)
        })

        // untuk dapetin data cart user
        axios.get(`http://localhost:2018/cart/${userID}`)
        .then((x) => {
            this.setState({
                cart: x.data
            })
        })
    }

    // fungsi untuk menghitung total harga (subTotal)
    total(){
        var total = 0;
        for(var i = 0; i<this.state.cart.length; i++){
            total += this.state.cart[i].totalPrice
        }
        return total 
    }

    // fungsi untuk GET ongkir dari route backend yang dapet dari API Raja Ongkir
    getOngkir = (city) => {
        axios.get(`http://localhost:2018/shipping/${city}`).then((x) => {
            this.setState({
                ongkir: x.data.rajaongkir.results[0].costs[1].cost[0].value,
                // subTotal: this.total() + this.state.ongkir
            })
        })    
    }

    render(){
        return(
            <div>
                <h3 className="widget-title">Order Summary</h3>
                <table className="table">
                    <tr>
                        <td>Cart Subtotal:</td>
                        <td className="text-medium">Rp. {this.total().toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Shipping (JNE Reguler):</td>
                        <td className="text-medium">Rp. {this.state.ongkir.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="text-lg text-medium">Rp. {parseInt(this.total() + this.state.ongkir).toLocaleString()}</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default orderSummary;