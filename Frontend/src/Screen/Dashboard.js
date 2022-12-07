import { Button, TextField,Grid } from "@mui/material";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  let adminExit = localStorage.getItem("loginInfo")
  ? JSON.parse(localStorage.getItem("loginInfo"))
  : null;
React.useEffect(() => {
  if (adminExit) {
    if (adminExit.isUserExist.isAdmin) {
    
    }else{
      navigate("/login");
    }
    
  } else {
    navigate("/login");
  }
}, []);


  var testm = 1000;
  const [reciveMoney,setReciveMoneyMoney] = useState()
  async function handleToken(token) {
    const response = await axios.post(
      "/api/admin/checkout",
      { token,reciveMoney }
    );

    // if (response.status === 200) {
    //   toast("Success! Check email for details", { type: "success" });
    // } else {
    //   toast("Something went wrong", { type: "error" });
    // }
  }
  return (
      <Grid container spacing={2} style={{textAlign:'center',marginLeft:'auto',marginRight:'auto'}}>
       <Grid item xs={12}>
      <TextField
        value={reciveMoney}
        onChange={(e)=>setReciveMoneyMoney(e.target.value)}
        name="Ddoc"
        id="outlined-basic"
        variant="outlined"
        type="number"
        inputProps={{
          multiple: true,
        }}
        style={{
          width: "50%",
          paddingLeft: "8px",
          paddingTop: "6px",
          paddingBottom: "6px",
          backgroundColor : '#ffff',

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
            backgroundImage: "linear-gradient(to right, #c95ad0 , #8870e8)",
            border: "none",
            color: "white",
            padding: "15px 32px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            justifyItems:'center',
           
          }}
        >
          buy
        </Button>
      </StripeCheckout>
      </Grid>

      </Grid>
  );
}

export default Dashboard;
