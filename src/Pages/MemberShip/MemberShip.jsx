import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../Comments/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);



const MemberShip = () => {



  return (
    <div className="h-[70vh]">
      



<Elements stripe={stripePromise}>
    
<CheckOutForm></CheckOutForm>

    </Elements>

    </div>
  );
};

export default MemberShip;