import React, { Fragment, useEffect } from "react";
import axios from "axios";

const stripe = window.Stripe(process.env.REACT_APP_EH_STELLE_E_STRISCE_PK);

export const Buy = () => {

  useEffect(() => {
    async function fetchData() {
      const session = await axios.post(
        `/stripe/getsession/${process.env.REACT_APP_EH_STELLE_E_STRISCE_SK}`
      );
      stripe
        .redirectToCheckout({
          sessionId: session.data.id
        })
        .then(result => {
          console.log(result.error.message);
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
    }
    fetchData();
  }, []);

  return <Fragment />;
  /* <div className="baseColorPicker-a">
            <input
              type="button"
              name="diffuseColor-hexcolor"
              value="Buy"
              onClick={eb => onBuy(eb)}
            />
          </div> */
};
