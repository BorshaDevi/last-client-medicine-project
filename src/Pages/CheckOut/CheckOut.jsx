import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise=loadStripe(import.meta.env.VITE_STRIPE_KEY)
const CheckOut = () => {
    return (
        <div className="mb-10 mx-auto p-10">
           <div className=' text-center mt-10 mb-10'>
           <h1 className='text-2xl font-bold text-teal-600'>Payment</h1>
           <hr></hr>
           <p>Please pay </p>
           </div>
           <Elements stripe={stripePromise}>
              <CheckOutForm></CheckOutForm>
           </Elements>
        </div>
    );
};

export default CheckOut;