import { useEffect, useState } from "react";
import { Box,Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "../../Component/DataGrid";
import { findUserDocumentLinkAction } from "../../action/userAction";
import { Button } from "antd";

export default function HomeUserForDocument() {
  const dispatch = useDispatch();
  const [documentData, setDocumentData] = useState([]);

  useEffect(() => {
    dispatch(findUserDocumentLinkAction());
  }, []);

  const { userFindDocumentData } = useSelector((state) => {
    return state.findUserDocumentLink;
  });

  useEffect(() => {
    if (userFindDocumentData) {
      setDocumentData(userFindDocumentData);
    }
  }, [userFindDocumentData]);

  return (
    <>
      <Box
        sx={{
          height: 400,
          width: { xs: "auto", sm: "auto", md: "auto" },
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "15px",
        }}
      >
        {documentData.length !== 0 ? (
          <DataTable data={documentData} type={"user"} typeLink={"document"} />
        ): <Typography variant="h4" component="h2" align="center">Sorry No Data</Typography>}
      </Box>
    </>
  );
}
