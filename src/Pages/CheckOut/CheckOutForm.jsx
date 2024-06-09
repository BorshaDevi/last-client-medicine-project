import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { BiMessageError } from "react-icons/bi";
import useSecret from "../../Hook/useSecret";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";


const CheckOutForm = () => {
    const {user}=useAuth()
    const [clientSecret ,setClientSecret]=useState('')
    const axiosSecret=useSecret()
    const [errorMessage ,setError]=useState('')
    const stripe=useStripe()
    const elements=useElements()
    const{data : cart =[]}=useQuery({
        queryKey:['cart'],
        queryFn:async()=>{
            const cartData=await axiosSecret.get(`/cart/${user?.email}`)
            console.log(cartData.data)
            return cartData.data
        }
    })
    const totalPrice=cart.reduce((total,item)=> total + item.price,0)
    useEffect(()=>{
        axiosSecret.post('/create-payment-intent',{price : totalPrice})
        .then(res =>{
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
    },[axiosSecret,totalPrice])
    const handleSubmit=async(e)=>{
       e.preventDefault()
       if(!stripe || ! elements){
        return;
       }
       const card=elements.getElement(CardElement)
       if(card === null){
        return;
       }
       const{error,paymentMethod} =await stripe.createPaymentMethod({
        type:'card',
        card
       })
       if(error){
        console.log(error)
        setError(error.message)
       } 
       else{
        console.log('[PaymentMethods]',paymentMethod)
        setError('')
       }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
               <CardElement 
                options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
               >
               </CardElement>
               <button type="submit" className="bg-teal-800 p-3 btn mt-5" disabled={!stripe || !clientSecret}>
        Pay
      </button>
            </form>
            { errorMessage && <p className="text-red-500 flex gap-1 mt-5"><BiMessageError />{errorMessage}</p>}
        </div>
    );
};

export default CheckOutForm;