import { Button, TextField, Grid } from "@mui/material";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { grey } from "@mui/material/colors";
import UserLogout from "../../Component/UserComponent/UserLogout";

function HomeUserStripe() {
  var testm = 1000;
  const [reciveMoney, setReciveMoneyMoney] = useState();
  async function handleToken(token) {
    const response = await axios.post("/api/admin/checkout", {
      token,
      reciveMoney,
    });
    // if (response.status === 200) {
    //   toast("Success! Check email for details", { type: "success" });
    // } else {
    //   toast("Something went wrong", { type: "error" });
    // }
  }
  return (
    <>
      <div
        style={{
          height: "500px",
          position: "relative",
        }}
      >
        <div
          style={{
            margin: 0,
            position: "absolute",
            marginTop: "10%",
            left: "37%",
            // -ms-transform: 'translate(-50%, -50%)',
            // transform: 'translate(-50%, -50%)',
          }}
        >
          <Grid
            container
            style={{
              border: "1px solid #D4D4D4",
              padding: "32px",
              backgroundColor: "#F7F7F7",
              borderRadius: "6px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Grid item xs={12}>
              <p style={{ color: "#7A7A7A" }}>Enter the amount </p>
              <TextField
                value={reciveMoney}
                onChange={(e) => setReciveMoneyMoney(e.target.value)}
                name="Ddoc"
                id="outlined-basic"
                variant="outlined"
                type="number"
                inputProps={{
                  multiple: true,
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#ffff",

                  "&:hover": {
                    border: "2px solid green",
                  },
                }}
                placeholder="Enter Amount"
              />
            </Grid>

            <Grid item xs={12}>
              <StripeCheckout
                className="center"
                stripeKey="pk_test_51LISYcIY8P5aqPzx9u5R9CIT5N5qSLkXBiywRXo6bTtk9iUZfX3UcdYjeaZc5DGQYMa9aTycRaXAm3VQ6llpXYRd00GHLpx4ne"
                token={handleToken}
                amount={`${reciveMoney}${"00"}`}
                name="Sample Book"
                shippingAddress={true}
                billingAddress={true}
              >
                <Button
                  style={{
                    marginTop: "10px",
                    backgroundImage:
                      "linear-gradient(to right, #c95ad0 , #8870e8)",
                    border: "none",
                    color: "white",
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: "16px",
                    float: "right",
                  }}
                >
                  buy
                </Button>
              </StripeCheckout>
            </Grid>
          </Grid>
        </div>
      </div>
      <UserLogout />
    </>
  );
}

export default HomeUserStripe;
