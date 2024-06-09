import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { BiMessageError } from "react-icons/bi";
import useSecret from "../../Hook/useSecret";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import { HiMiniCheck } from "react-icons/hi2";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckOutForm = () => {
    const {user}=useAuth()
    const navigate=useNavigate()
    const [clientSecret ,setClientSecret]=useState('')
    const [transactionId,setTransactionId]=useState('')
    const axiosSecret=useSecret()
    const [errorMessage ,setError]=useState('')
    const stripe=useStripe()
    const elements=useElements()
    const{data : cart =[] , refetch}=useQuery({
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
       const {paymentIntent ,error : confirmError}= await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
           card: card,
           billing_details: {
             
             email:user?.email,
           },
         },
       })
       if(confirmError){
        console.log(confirmError)
       }
       else{
        console.log(paymentIntent)
        if(paymentIntent.status === 'succeeded'){
          setTransactionId(paymentIntent.id)
         }
         const paymentData={
          buyerEmail:user?.email,
          price:totalPrice,
          transactionId:paymentIntent.id,
          status:'pending',
          date:new Date(),
          medicineNames:cart.map(name => name.medicineName),
          cartIds:cart.map(cartId => cartId._id ),
          menuIds:cart.map(menu => menu.menuId),
          sellerEmail:cart.map(email => email.sellerEmail)
         }
         console.log("paymentData",paymentData)
         const paymentDataSet=await axiosSecret.post('/payment',paymentData)
         if(paymentDataSet.data.result.insertedId && paymentDataSet.data.updateDoc.deletedCount>0 ){
           refetch()
           Swal.fire({
            title: "Payment successful",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
            
          }); 
          navigate('/invoicePage')
         }
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
            { transactionId && <p className="text-green-500 flex gap-1 mt-5"><HiMiniCheck />{transactionId}</p>}
        </div>
    );
};

export default CheckOutForm;