import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxoisSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../AuthProbider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner";
import Swal from "sweetalert2";
import { FaMedal } from "react-icons/fa";

const CheckOutForm = () => {
  const {user}=useContext(AuthContext)
  const [error, setError] = useState('')
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('')
const axiosSecure=useAxoisSecure()
const [transactionId, setTranscationId] = useState('')



const { isPending, data: users } = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users?email=${user.email}`)
    return res.data
  }

})

const userid=users?.map(item => item._id)
console.log(userid);
const totalPrice="10"

  useEffect(() => {
    if(totalPrice){
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
      .then(res => {
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
  
      })
    }
  
    }, [axiosSecure, totalPrice])


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
     
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

// console.log(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const { error, paymentMethod } = await stripe.createPaymentMethod({
  type: 'card',
  card,
});

if (error) {
  console.log('[error]', error);
  setError(error.message)
} else {
  console.log('[PaymentMethod]', paymentMethod);
  setError('')
}

   // confirm payment
   const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
      billing_details: {
        email: user?.email || 'anonymas',
        name: user?.displayName || 'anonymas',

      }
    }
  })

  if (confirmError) {
    console.log('confirm error');
  }
  else {
    console.log('payment intent', paymentIntent);
    if (paymentIntent.status === 'succeeded') {
      console.log('transaction id', paymentIntent.id);
      setTranscationId(paymentIntent.id)}
 // now save the payment in the database
 const payment = {
  Badge: 'Gold'
}
const res=await axiosSecure.patch(`/users/${userid}/badge`,payment)
console.log(res.data);

if(res.data?.paymentResult?.insertedId){
Swal.fire({
position: "top-end",
icon: "success",
title: "Payment Success ",
showConfirmButton: false,
timer: 1500
});

}

    }
    }
    if(isPending) return <Spinner></Spinner>

  return (
    <div>
<div>
<div className="text-center my-10 w-96 mx-auto ">
      <p className="text-yellow-600 text-xl"> to pay $ 10 </p>
      <p className="text-black flex items-center gap-4 text-3xl border-y-2 py-2 mt-2">Upgrade Your Badge <span className="text-[#ffe23c]">
                      <FaMedal></FaMedal>
                    </span> </p>

                    <p className="text-yellow-600 text-sm">Also become a member of this site and unlimited post</p>
    </div>

</div>
    <div className="border-2 m-14 p-6 rounded-lg">

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
      />
      <button className="btn bg-blue-500 mt-9 text-white"  type="submit" disabled={!stripe}>
        Pay
      </button>

      <p className="text-red-500">
          {error}
        </p>
        {transactionId && <p className="text-green-500"> Your Transaction Id : {transactionId} </p>}
    </form>
    </div>
    </div>
  );
};

export default CheckOutForm;