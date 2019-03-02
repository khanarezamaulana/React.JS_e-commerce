import React from 'react';
import axios from 'axios';

class ConfirmPayment extends React.Component{

    constructor(){
        super();
        this.state = {

            transactionID: "",
            namaBank: "",
            pemilikRekening: "",
            nomorRekening: "",
            jumlahTransfer: ""
        }
    }

    validasiPembayaran = () => {

        axios.post('http://localhost:2018/pay', {

            transactionID: this.state.transactionID,
            namaBank: this.state.namaBank,
            pemilikRekening: this.state.pemilikRekening,
            nomorRekening: this.state.nomorRekening,
            jumlahTransfer: this.state.jumlahTransfer

        }).then((x) => {
            console.log(x)
            if (x.data.status == "orderanTidakDitemukan") {
                alert("Maaf, orderan Anda tidak ditemukan!");
                this.setState({
                    transactionID: "",
                    namaBank: "",
                    pemilikRekening: "",
                    nomorRekening: "",
                    jumlahTransfer: ""
                })
            }
            else if (x.data.status == "jumlahTransferTidakSesuai") {
                alert("Transferan Anda tidak sesuai!")
                this.setState({
                    jumlahTransfer: ""
                })
            }
            else {
                alert("Konfirmasi pembayaran berhasil, klik ok untuk melihat orderan Anda!")
                window.location.href="/checkout-complete";
            }
        }).catch((err) => {
            console.log(err)
            alert("gagal")
        })

    }

    render(){
        return(
            
            <div  style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>
                
                {/* Page Title */}
                <div className="page-title">
                    <div className="container">
                        <div className="column">
                            <h1>Confirm Payment</h1>
                        </div>
                        <div className="column">
                            <ul className="breadcrumbs">
                                <li><a href="index.html">Home</a>
                                </li>
                                <li className="separator">&nbsp;</li>
                                <li>Order</li>
                                <li className="separator">&nbsp;</li>
                                <li>Confirm Payment</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="padding-top-2x mt-2 hidden-lg-up"></div>
                    <h4>Confirm Payment</h4>
                    <hr className="padding-bottom-1x"/>
                    <form className="row">
                        <div className="col-md-6">
                        <div className="form-group">
                            <label for="account-company">No Invoice</label>
                            <input className="form-control" type="text" id="invoice"
                            onChange={(e) => {
                                this.setState({
                                    transactionID: e.target.value
                                })
                            }}
                            required/>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                            <label for="account-zip">Nama Bank</label>
                            <input className="form-control" type="text" id="nama-bank" required
                            onChange={(e) => {
                                this.setState({
                                    namaBank: e.target.value
                                })
                            }}
                            />
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                            <label for="account-zip">Nama Pemilik Rekening</label>
                            <input className="form-control" type="text" id="pemilik-rekening" required
                            onChange={(e) => {
                                this.setState({
                                    pemilikRekening: e.target.value
                                })
                            }}
                            />
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                            <label for="account-address1">Nomor Rekening</label>
                            <input className="form-control" type="text" id="nomor-rekening" required
                            onChange={(e) => {
                                this.setState({
                                    nomorRekening: e.target.value
                                })
                            }}
                            />
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                            <label for="account-address2">Jumlah Transfer</label>
                            <input className="form-control" type="text" id="jumlah-transfer" required
                            
                            onChange={(e) => {
                                this.setState({
                                    jumlahTransfer: e.target.value
                                })
                            }}
                            />
                        </div>
                        </div>
                        <div className="col-12 padding-top-1x">
                        <hr className="margin-top-1x margin-bottom-1x"/>
                        <div className="text-right">
                            <button onClick={this.validasiPembayaran} className="btn btn-primary margin-bottom-none" type="button">Confirm Payment</button>
                        </div>
                        </div>
                    </form>
                    </div>
            </div>
        )
    }
}

export default ConfirmPayment;