import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useConfirmedClassesDetails from "../../../hooks/useConfirmedClassesDetails";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);

const Payment = () => {
  const confirmedClassesDetails = useConfirmedClassesDetails();
  const totalPrice = confirmedClassesDetails.reduce(
    (sum, classDetails) => sum + classDetails?.price,
    0
  );

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          confirmedClassesDetails={confirmedClassesDetails}
          price={totalPrice}
        ></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
