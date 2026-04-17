import { Button, CircularProgress } from "@mui/material";

const CommonButton = ({
  label,
  onClick,
  variant = "contained",
  color = "primary",
  startIcon = null,
  endIcon = null,
  disabled = false,
  loading = false,
  size = "medium",
  sx = {},
  type = "button"
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      disabled={disabled || loading}
      onClick={onClick}
      size={size}
      type={type}
      sx={{
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 500,
        ...sx
      }}
    >
      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        label
      )}
    </Button>
  );
};

export default CommonButton;