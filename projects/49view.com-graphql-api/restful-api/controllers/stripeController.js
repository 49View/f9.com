exports.getSession = async skId => {
  const stripe = require("stripe")(skId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: "49view tier1",
        description: "Small business service premium",
        images: ["https://49view.com/ehlogo.svg"],
        amount: 60000,
        currency: "gbp",
        quantity: 1
      }
    ],
    success_url: "https://49view.com/buy/tier1/success",
    cancel_url: "https://49view.com/buy/tier1/cancel"
  });

  return session;
};
