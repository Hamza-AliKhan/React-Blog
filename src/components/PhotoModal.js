import { Box, Modal, Zoom } from "@mui/material";

export function PhotoModal({ open, handleClose, image }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ bgcolor: "rgba(0,0,0,0.5)" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "rgba(0,0,0,0.6)",
          border: "2px solid rgba(0,0,0,0.7)",
          boxShadow: 24,
          p: 0,
        }}
      >
        <Zoom in={open} timeout={1500}>
          <img
            src={image}
            alt="error"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </Zoom>
      </Box>
    </Modal>
  );
}

export default PhotoModal;
