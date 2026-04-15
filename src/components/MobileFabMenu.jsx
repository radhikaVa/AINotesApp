import React, { useState } from "react";
import { Fab, Box, Zoom } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const MobileFabMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    // <Box
    //   sx={{
    //     position: "fixed",
    //     bottom: 80,
    //     right: 40,
    //     display: { xs: "flex", md: "none" },
    //     flexDirection: "column",
    //     alignItems: "flex-end",
    //     gap: 2,
    //     zIndex: 1200
    //   }}
    // >
    <Box
  sx={{
    position: "fixed",
    bottom: "calc(20px + env(safe-area-inset-bottom))",
    right: 16,
    display: { xs: "flex", md: "none" },
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 2,
    zIndex: 1200
  }}
>
      {/* Dashboard FAB */}
      <Zoom in={open}>
        <Fab
          color="primary"
          size="medium"
          onClick={() => {
            navigate("/");
            setOpen(false);
          }}
        >
          <DashboardIcon />
        </Fab>
      </Zoom>

      {/* Create Note FAB */}
      <Zoom in={open}>
        <Fab
          color="secondary"
          size="medium"
          onClick={() => {
            navigate("/create");
            setOpen(false);
          }}
        >
          <NoteAddIcon />
        </Fab>
      </Zoom>

      {/* Main Toggle FAB */}
      <Fab color="success" onClick={toggleMenu}>
        {open ? <CloseIcon /> : <AddIcon />}
      </Fab>
    </Box>
  );
};

export default MobileFabMenu;