const stripe = require("stripe")(process.env.STRIPE_API_KEY);

function createPrice() {
  return stripe.products
    .create({
      name: "Black Coffee",
      description: "$ 3.50 - Your standard black coffee",
    })
    .then((product) => {
      return stripe.prices
        .create({
          unit_amount: 350, // 350 cents = $3.50 CAD
          currency: "cad",
          product: product.id,
        })
        .then((price) => {
          console.log(
            "Success! Here is your product id: " + product.id
          );
          console.log(
            "Success! Here is your price id: " + price.id
          );
          return { product, price };
        });
    })
    .catch((error) => {
      console.error("Error creating product or price:", error);
      throw error;
    });
}

function handleCheckout() {
  const storeItems = new Map([
    [1, { price: 100, name: "test" }, 2, { price: 200, name: "test2" }],
  ]);
}

async function createCheckoutSession(req, res) {
    const session = await stripe.checkout.sessions.create({
        line_items: [{
        price_data: {
            currency: 'usd',
            product_data: {
            name: 'T-shirt',
            },
            unit_amount: 2000,
        },
        quantity: 1,
        }],
        mode: 'payment',
        ui_mode: 'embedded',
        return_url:`${process.env.CLIENT_URL}/return?session_id={CHECKOUT_SESSION_ID}`
    });
    res.send({clientSecret: session.client_secret});
}

async function getSessionStatus(req, res) {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    payment_status: session.payment_status,
    customer_email: session.customer_details.email
  });
};


module.exports = { createPrice, handleCheckout, createCheckoutSession, getSessionStatus };
