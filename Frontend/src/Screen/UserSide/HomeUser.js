import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";

import { findUserVideoLinkAction } from "../../action/userAction";
import DataTable from "../../Component/DataGrid";

export default function HomeUser() {
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    dispatch(findUserVideoLinkAction());
  }, []);

  const { userFindVideoData } = useSelector((state) => {
    return state.findUserVideoLink;
  });

  useEffect(() => {
    if (userFindVideoData) {
      setVideoData(userFindVideoData);
    }
  }, [userFindVideoData]);

  const columns = [
    {
      title: "video Link Name",
      dataIndex: "videoName",
      key: "videoName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Video Link",
      dataIndex: "videoLink",
      key: "videoLink",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];

  const data =
    userFindVideoData &&
    userFindVideoData.map((doc) => {
      return {
        videoName: doc.documentVLname,
        videoLink: (
          <Tooltip title="youtube video">
            <a href={`${doc.videoLink}`} target="_blank">
              {doc.videoLink}
            </a>
          </Tooltip>
        ),
        action: (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" size="large">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ),
      };
    });

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
        {videoData.length !== 0 ? (
          <DataTable data={videoData} type={"user"} typeLink={"video"} />
        ) : (
          <Typography variant="h4" component="h2" align="center">
            Sorry No Data
          </Typography>
        )}
      </Box>
    </>
  );
}
