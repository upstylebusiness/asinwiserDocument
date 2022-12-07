import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVidDocAction,
  documentFindAction,
  driveDocumentFindAction,
} from "../action/adminAction";
import UserLogout from "../Component/UserComponent/UserLogout";

export default function DataTable({ data, type, typeLink }) {
  const dispatch = useDispatch();

  const { findDriveDocument } = useSelector((state) => {
    return state.driveDocumentFind;
  });

  const { findDocument } = useSelector((state) => {
    return state.documentFind;
  });

  useEffect(() => {
    if (type == "document") dispatch(documentFindAction());
    if (type == "video") dispatch(driveDocumentFindAction());
  }, [data]);

  const columns = [
    { field: "id", headerName: "SNO", width: 160 },
    { field: "DocumentName", headerName: "Document Name", width: 170 },
    {
      field: "DocumentLink",
      headerName: "Document Link",
      width: 570,
      renderCell: (params) => (
        <a
          target="_blank"
          href={`${
            params.row.driveDocumentLink
              ? params.row.driveDocumentLink
              : params.row.DocumentLink
          }`}
          style={{ textDecoration: "none" }}
        >
          {`${
            params.row.driveDocumentLink
              ? params.row.driveDocumentLink
              : params.row.DocumentLink
          }`}
        </a>
      ),
    },
    type != "user"
      ? {
          field: "Action",
          headerName: "action",
          width: "160",
          renderCell: (params) => (
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => {
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
                    dispatch(deleteVidDocAction(params.id));
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    );
                  }
                });
              }}
            >
              <DeleteIcon>DELETE</DeleteIcon>
            </IconButton>
          ),
        }
      : {
          field: "",
          headerName: "action",
          width: "160",
          renderCell: (params) => (
            <a
              target="_blank"
              href={`${
                params.row.driveDocumentLink
                  ? params.row.driveDocumentLink
                  : params.row.DocumentLink
              }`}
              style={{ textDecoration: "none" }}
            >
              {console.log(params)}
              <Button
                aria-label="delete"
                size="small"
                variant="contained"
                color="primary"
              >
                Click Here
              </Button>
            </a>
          ),
        },
  ];
  const rows =
    data.length != 0 &&
    data.map((data) => {
      return {
        id: data._id,
        DocumentName:
          typeLink == "document" ? data.driveDocumentName : data.documentVLname,
        DocumentLink:
          typeLink == "document" ? data.driveDocumentLink : data.videoLink,
        action: type != "user" ? data._id : data,
      };
    });
  return (
    <Container maxWidth="lg" SX={{ marginTop: "15px" }}>
      <Box
        sx={{
          height: 400,
          width: { xs: "auto", sm: "auto", md: "auto" },
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <DataGrid
          rows={rows && rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
      <UserLogout />
    </Container>
  );
}
