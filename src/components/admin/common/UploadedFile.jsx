import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import constants from "../../../constants/constants";

const options = ["View", "Approve", "Reject"];

function UploadedFile(props) {
  const {
    data: { name, status }
  } = props;
  const { statusColor } = constants;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectedClose = (data, option) => {
    setAnchorEl(null);
    props.handleFileSelect(data, option);
  };

  let statusIcon = null;

  switch (status) {
    case "PENDING": {
      statusIcon = <CheckIcon style={{ color: statusColor.pending }} />;
      break;
    }
    case "SUBMITTED": {
      statusIcon = <CheckIcon style={{ color: statusColor.submitted }} />;
      break;
    }
    case "REJECTED": {
      statusIcon = <ErrorIcon style={{ color: statusColor.rejected }} />;
      break;
    }
    case "APPROVED": {
      statusIcon = <CheckIcon style={{ color: statusColor.approved }} />;
      break;
    }
    default: {
      statusIcon = <CheckIcon style={{ color: statusColor.pending }} />;
      break;
    }
  }

  return (
    <div>
      <ListItem button>
        <ListItemIcon>{statusIcon}</ListItemIcon>
        <ListItemText
          onClick={() => handleSelectedClose(props.data, "View")}
          primary={name}
          secondary={status}
        />
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: 200
            }
          }}
        >
          {options.map(option => (
            <MenuItem
              key={option}
              onClick={() => handleSelectedClose(props.data, option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </ListItem>
    </div>
  );
}

export default UploadedFile;
