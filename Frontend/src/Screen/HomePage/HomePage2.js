import { Box } from "@mui/system";
import {
  Button,
  Grid,
  IconButton,
  Select,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import {
  deleteDriveDocuAction,
  documentFindAction,
  driveDocumentFindAction,
  driveDocumentUploadAction,
} from "../../action/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Table } from "antd";
import DataTable from "../../Component/DataGrid";

function HomePage2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [dataTable, setDataTable] = useState([]);

  const { addDriveDocument } = useSelector((state) => {
    return state.driveDocumentUpload;
  });

  const { findDriveDocument } = useSelector((state) => {
    return state.driveDocumentFind;
  });

  const { dleteDriveDocument } = useSelector((state) => {
    return state.deleteDriveDocu;
  });

  const { showUser } = useSelector((state) => {
    return state.userFind;
  });

  useEffect(() => {
    if (findDriveDocument) {
      setDataTable(findDriveDocument);
    }
  }, [addDriveDocument, dleteDriveDocument]);

  //doc find
  useEffect(() => {
    dispatch(driveDocumentFindAction());
  }, [addDriveDocument, dleteDriveDocument]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // handleSelectChange
  const handleSelectChange = (e) => {
    setSelectUser(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectUser, "sdselectUser");
    dispatch(driveDocumentUploadAction(formValues, selectUser));
  };

  const deleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDriveDocuAction(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const columns = [
    {
      title: "Drive Document Name",
      dataIndex: "DocumentName",
      key: "DocumentName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Drive Document Link",
      dataIndex: "DocumentLink",
      key: "DocumentLink",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];
  const data =
    findDriveDocument &&
    findDriveDocument.map((doc) => {
      return {
        DocumentName: doc.driveDocumentName,
        DocumentLink: (
          <Tooltip title="youtube video">
            <a href={`${doc.driveDocumentLink}`} target="_blank">
              {doc.driveDocumentLink}
            </a>
          </Tooltip>
        ),
        action: (
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                deleteClick(doc._id);
              }}
              aria-label="delete"
              size="large"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ),
      };
    });
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
                name="dDname"
                style={{
                  width: "100%",
                  paddingLeft: "8px",
                  paddingTop: "6px",
                  paddingBottom: "6px",

                  "&:hover": {
                    border: "2px solid green",
                  },
                }}
                placeholder="Document Name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                type="text"
                value={formValues.Dlink}
                onChange={handleInputChange}
                name="dDlink"
                style={{
                  width: "100%",
                  paddingLeft: "8px",
                  paddingTop: "6px",
                  paddingBottom: "6px",

                  "&:hover": {
                    border: "2px solid green",
                  },
                }}
                placeholder="Document Link"
              />
            </Grid>
          </Grid>
          <></>

          <table width={"100%"}>
            <tr>
              <td width={"90%"}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  lable="select user"
                  value={selectUser}
                  onChange={handleSelectChange}
                  style={{
                    width: "100%",
                    paddingLeft: "8px",
                    paddingTop: "0px !important",
                    paddingBottom: "0px !important",
                    "&:hover": {
                      border: "2px solid green",
                    },
                  }}
                  placeholder="select User"
                >
                  {showUser &&
                    showUser.map((data, index) => {
                      return <MenuItem value={data._id}>{data.name}</MenuItem>;
                    })}
                  <MenuItem value="all">All Users</MenuItem>
                </Select>
              </td>
              <td width={"10%"}>
                <Button
                  style={{ width: "100%", padding: "0px", height: "54px" }}
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
        </form>
      </Box>
      <DataTable data={dataTable} link={"document"} typeLink={"document"} />
      {/* <Box
        sx={{
          height: 400,
          width: { xs: "auto", sm: "auto", md: "auto" },
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Table
          style={{ marginTop: "10px" }}
          columns={columns}
          dataSource={data}
          antTableProps={{
            showHeader: true,
            pagination: false,
          }}
          mobileBreakPoint={768}
        />
      </Box> */}
    </div>
  );
}

export default HomePage2;
