import React, { Component } from 'react';
import axios from 'axios';
class CheckoutPage extends Component {
    // state = {
    //     checkoutId: null,
    //     loading: true
    // }
    componentDidMount() {
        // axios.post("/api/checkout", ).then(res => {
        //     this.setState({
        //         checkoutId: res.data.id,
        //         loading: false
        //     })
        // })
    }
    renderPaymentform = (script_url,shopperResultUrl) => {
        console.log('Loading ')
        const script = document.createElement("script");

        script.src = {script_url};
        script.async = true;

        document.body.appendChild(script);

        const form = document.createElement("form")
        form.action = {shopperResultUrl};
        form.setAttribute("class", "paymentWidgets");
        form.setAttribute("data-brands", "VISA MASTER AMEX")
        document.body.appendChild(form);
    }
    render() {
        // if (!this.state.loading) {
            return (
                <div >
                    {this.renderPaymentform(this.props.script_url,this.props.shopperResultUrl)}
                </div>
            );
        // } else {
        //     return (
        //         <div> Still Loading</div>
        //     )
        // }
    }
}

export default CheckoutPage;