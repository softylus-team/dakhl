import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import LocalizedStrings from 'react-localization';
import stringss from "../../strings";
import { Helmet } from "react-helmet";
import Container from '@/components/container';
import PaymentSteps from '@/Components/PaymentSteps';
export default function prepareCheckout(props) {
    // console.log(props.redirect);
    console.log(props.LaravelHyperpay.original);
    var script_url = props.LaravelHyperpay.original.script_url;
    var shopperResultUrl = props.LaravelHyperpay.original.shopperResultUrl;

    let strings = new LocalizedStrings(stringss);
    strings.setLanguage(props.locale);
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = { script_url };
    //     script.async = true;


    //     document.head.appendChild(script);
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);
    return (

        <div className={`w-full min-h-screen ${props.fromWallet?"flex justify-center items-center":""}`} style={{ backgroundColor: "#F8FCFC", direction: `${props.locale == 'ar' ? "rtl" : "ltr"}` }}>
            <Helmet>
                <script src={"/wpwlOptions.js"} async></script>
                <script src={script_url} async></script>
            </Helmet>
            {props.fromWallet?"":
            <Container className={"my-8"}>
                <PaymentSteps step={2} strings={strings} />
            </Container>
            }
               <form
                action={shopperResultUrl}
                className="paymentWidgets"
                data-brands={props.paymentBrand}
                style={{ direction: "ltr" }}
            ></form> 
            
            {/* <form
                    action={props.redirect.url}
                    className="paymentWidgets"
                    data-brands="VISA MASTER"
                    method={props.redirect.method}
                >
                    {props.redirect.parameters.map(function(parameter,index) {
                            return(<input key={index} type="hidden" name={parameter.name} value={parameter.value} />
                    )})
                    }
                     <div className="my-4 flex items-center justify-center mt-4">
                                <Button className="w-1/2 flex justify-center">
                                    {strings.payConfirmation}
                                </Button>
                            </div>
                </form> */}
        </div>
    );
}
