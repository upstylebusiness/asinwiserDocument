import { Box } from "@mui/system";
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { Select, Table } from "antd";
import DataTable from "../../Component/DataGrid";
import { useEffect, useState } from "react";
import {
  documentFindAction,
  documentUploadAction,
  userFindAction,
} from "../../action/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState("");
  const [selectUser, setSelectUser] = useState("");

  const [dataTable, setDataTable] = useState([]);

  const { uploadDocument } = useSelector((state) => {
    return state.documentUpload;
  });

  const { findDocument } = useSelector((state) => {
    return state.documentFind;
  });
  const { deleDocument } = useSelector((state) => {
    return state.deleteVidDoc;
  });

  const { showUser } = useSelector((state) => {
    return state.userFind;
  });

  //userFind
  useEffect(() => {
    dispatch(documentFindAction());
  }, [uploadDocument, deleDocument]);

  //userFind
  useEffect(() => {
    dispatch(userFindAction());
  }, [uploadDocument, deleDocument, findDocument]);

  useEffect(() => {
    if (findDocument) {
      setDataTable(findDocument);
    }
  }, [findDocument, deleDocument]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    alert(name, value, "skdjfbhskdjbfk");
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // handleSelectChange
  const handleSelectChange = (e) => {
    setSelectUser(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(documentUploadAction(formValues,selectUser));
  };

  return (
    <div>
      <Box
        sx={{
          boxShadow: 3,
          width: "auto",
          height: "auto",
          w: "50",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: "center",
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              {" "}
              <TextField
                type="text"
                value={formValues.Dname}
                onChange={handleInputChange}
                name="Dname"
                style={{
                  width: "100%",
                  paddingLeft: "8px",
                  paddingTop: "6px",
                  paddingBottom: "6px",

                  "&:hover": {
                    border: "2px solid green",
                  },
                }}
                placeholder="Video Name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                type="text"
                value={formValues.Dlink}
                onChange={handleInputChange}
                name="Dlink"
                style={{
                  width: "100%",
                  paddingLeft: "8px",
                  paddingTop: "6px",
                  paddingBottom: "6px",

                  "&:hover": {
                    border: "2px solid green",
                  },
                }}
                placeholder="Video Link"
              />
            </Grid>

            <table width={"100%"}>
              <tr>
                <td width={"85%"}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    lable='select user'
                    value={selectUser}
                    onChange={handleSelectChange}
                    style={{
                      width: "100%",
                      paddingLeft: "8px",
                      paddingTop: "6px",
                      paddingBottom: "6px",

                      "&:hover": {
                        border: "2px solid green",
                      },
                    }}
                    placeholder="Select User"
                  >
                    {showUser &&
                      showUser.map((data, index) => {
                        return (
                          <MenuItem value={data._id}>
                            {data.name}
                          </MenuItem>
                        );
                      })}
                    <MenuItem value="all">All Users</MenuItem>
                  </Select>
                </td>


                <td width={"10%"}>
                  <Button
                    style={{ width: "100%", padding: "0px" }}
                    sx={{
                      width: { xs: "100%", sm: "100%", md: "20%" },
                      // marginTop: "10px",
                      backgroundImage:
                        "linear-gradient(to right, #c95ad0 , #8870e8)",
                      border: "none",
                      color: "white",
                      // padding: "15px 32px",
                      textAlign: "center",
                      textDecoration: "none",
                      // display: "inline-block",
                      fontSize: "16px",
                    }}
                    type="submit"
                  >
                    Add
                  </Button>
                </td>
              </tr>
            </table>
          </Grid>
          <></>
          <Grid item xs={12} sm={12} md={12}></Grid>
        </form>
      </Box>
      <DataTable data={dataTable} link={"video"} typeLink={"video"} />
    </div>
  );
}

export default HomePage;
