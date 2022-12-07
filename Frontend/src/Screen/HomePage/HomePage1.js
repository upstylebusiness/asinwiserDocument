import { Box } from "@mui/system";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { Table } from "antd";
import { useEffect, useState } from "react";
// import {
// //   documentFindAction,
//   documentUploadAction,
// } from "../../action/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fileDocumentUploadAction } from "../../action/adminAction";

function HomePage1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState("");
  const [fileValues, setFileValues] = useState("");
  const [base64, setBase64] = useState("");



//   const { uploadDocument } = useSelector((state) => {
//     return state.documentUpload;
//   });

//   const { findDocument } = useSelector((state) => {
//     return state.documentFind;
//   });

//userFind
//   useEffect(() => {
//     dispatch(documentFindAction());
//   }, [uploadDocument]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch(fileDocumentUploadAction(formValues,base64));
  };

  const columns = [
    {
      title: "Video Name",
      dataIndex: "DocumentName",
      key: "DocumentName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Video Link",
      dataIndex: "DocumentLink",
      key: "DocumentLink",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];

  //antb data
//   const data =
//     findDocument &&
//     findDocument.map((doc) => {
//       return {
//         DocumentName: doc.documentVLname,
//         DocumentLink: (
//           <Tooltip title="youtube video">
//             <a href={`${doc.videoLink}`} target="_blank">
//               {doc.videoLink}
//             </a>
//           </Tooltip>
//         ),
//         action: (
//           <Tooltip title="Delete">
//             <IconButton aria-label="delete" size="large">
//               <DeleteIcon fontSize="inherit" />
//             </IconButton>
//           </Tooltip>
//         ),
//       };
//     });

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
          <>
            <TextField
              type="text"
              value={formValues.Dname}
              onChange={handleInputChange}
              name="Dname"
              style={{
                width: "50%",
                paddingLeft: "8px",
                paddingTop: "6px",
                paddingBottom: "6px",

                "&:hover": {
                  border: "2px solid green",
                },
              }}
              placeholder="Document Name"
            />
            <TextField value={formValues.Ddoc}
              onChange={(e)=>{
                console.log(e.target.files[0],'valueeeeeeeeeeeeeeeeeeeeeeeeeee');
                setFileValues(e.target.files[0])
                const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {setBase64(reader.result)}
              }}
              name="Ddoc"
            id="outlined-basic"
            variant="outlined"
            type="file"
            inputProps={{
              multiple: true
            }}
            style={{
                width: "50%",
                paddingLeft: "8px",
                paddingTop: "6px",
                paddingBottom: "6px",

                "&:hover": {
                  border: "2px solid green",
                },
              }}
              placeholder="Document Link"
          />
          </>
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
            }}
            type="submit"
          >
            Add
          </Button>
        </form>
      </Box>

      <Table
        style={{ marginTop: "10px" }}
        columns={columns}
        // dataSource={data}
        antTableProps={{
          showHeader: true,
          pagination: false,
        }}
        mobileBreakPoint={768}
      />
    </div>
  );
}

export default HomePage1;
