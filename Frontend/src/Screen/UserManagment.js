import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";

import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
  Paper
} from "@material-ui/core";
import Swal from "sweetalert2";

import { Space, Table, Tag,Dropdown,Menu } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { userFindAction, userRegisterAction } from "../action/adminAction";

function UserManagment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const handleChange = (event, id) => {
    setStatus(event.target.value);
    // dispatch(userStatusChageAction(event.target.value, id));
  };
 
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const { userInsert } = useSelector((state) => {
    return state.userRegister;
  });

  const { showUser } = useSelector((state) => {
    return state.userFind;
  });

  //userFind
  useEffect(() => {
    dispatch(userFindAction());
  }, [userInsert]);

  const [formValues, setFormValues] = useState("HELLO");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];

  //antb data
  const data =
    showUser &&
    showUser.map((user) => {
      return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: (
          <Tag
            color={user.status == "Block" ? "#dd2c00" : "#69f0ae"}
            key={user.status}
          >
            {user.status.toUpperCase()}
          </Tag>
        ),
         action:(
   <Menu>
  <Menu.Item>Active</Menu.Item>
  <Menu.Item>Block</Menu.Item>
</Menu>
        ),
      };
    });

  ///FORM MATERIAL UI
  const [phone, setPhoe] = useState();
  const handleOnChange = (value) => {
    setPhoe(value);
  };

  // //modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(formValues.password)
    dispatch(userRegisterAction(formValues, phone));
  };

  //sweetAlert
  useEffect(() => {
    if (userInsert) {
      setModalOpen(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [userInsert]);

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Typography
                variant="h5"
                sx={{ color: "#1565C0", fontWeight: "bold", mt: "10px" }}
              >
                Create User
              </Typography>
              <Grid item>
                <TextField
                  id="name-input"
                  name="name"
                  label="Enter User Name"
                  type="text"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item style={{ marginTop: "15px" }}>
                <TextField
                  id="name-input"
                  aria-label="empty textarea"
                  placeholder="Enter User Email"
                  label="Enter User Email"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item style={{ marginTop: "15px" }}>
                <TextField
                  id="name-input"
                  name="password"
                  placeholder="Enter User Password"
                  label="Enter User Password"
                  type="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                {/* <TextField
                  id="name-input"
                  name="phone"
                  placeholder="Enter User Phone"
                  label="Enter User Phone"
                  type="text"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  sx={{ marginTop: "10px" }}
                /> */}
                <MuiPhoneNumber
                  sx={{ marginTop: "10px" }}
                  defaultCountry={"in"}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item style={{ marginTop: "20px" }}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Box>
        <Button onClick={handleOpen} variant="contained" color="primary">
          Add User
        </Button>
      </Box>
      <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
              style={{width:"100%"}}
            >
        <Grid item style={{width:"100%"}}>
            <Paper className="container">    
            
      <Table style={{marginTop:"10px"}} columns={columns} dataSource={data}   antTableProps={{
        showHeader: true,
        pagination: false
      }}
      mobileBreakPoint={768}/>

      </Paper>
      </Grid>
      </Grid>
    </>
  );
}

export default UserManagment;
