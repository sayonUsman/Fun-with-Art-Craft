import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../authProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import useConfirmedClasses from "../../../hooks/useConfirmedClasses";

const CheckoutForm = ({ confirmedClassesDetails, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { loggedInUser } = useContext(AuthContext);
  const userDetails = loggedInUser();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const [, refetch] = useConfirmedClasses();

  useEffect(() => {
    if (price > 0) {
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setProcessing(true);

    const { paymentIntent, err } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: { name: userDetails[0], email: userDetails[1] },
        },
      }
    );

    if (err) {
      setErrorMessage(err.message);
    }

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      const paymentDetails = {
        date: moment().format("LL"),
        time: moment().format("LT"),
        email: userDetails[1],
        transactionId: paymentIntent.id,
        totalPrice: price,
        classes: confirmedClassesDetails.map(
          (classDetails) => classDetails.className
        ),
        classesId: confirmedClassesDetails.map(
          (classDetails) => classDetails._id
        ),
      };

      fetch("http://localhost:5000/payment-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            fetch(
              `http://localhost:5000/confirmedClasses?email=${userDetails[1]}`,
              {
                method: "DELETE",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.acknowledged) {
                  refetch(); // To remove all confirmed classes from UI
                }
              });

            Swal.fire({
              title: "Payment Confirmed.",
              text: "Thank you for your purchase!",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/dashboard");
              }
            });
          }
        });
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <div className="card rounded-md flex-shrink-0 shadow-md shadow-zinc-800">
          <div className="card-body">
            <form className="w-96" onSubmit={handleSubmit}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />

              <div className="flex">
                <button
                  type="submit"
                  disabled={!stripe || !clientSecret || processing}
                  className="flex mx-auto btn rounded btn-sm btn-outline btn-black mt-9"
                >
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
