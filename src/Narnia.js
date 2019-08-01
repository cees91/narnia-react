import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Narnia(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      {props.person.firstName ? (
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Enter narnia with {props.person.firstName}
        </Button>
      ) : (
        <div>Please select a tourist</div>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Typography variant="h3" className={classes.title}>
          Welcome to the door of Narnia {props.person.firstName}
        </Typography>
        <div>
          <img src="narnia.jpg" style={{ width: "100%" }} />
        </div>
        <Typography variant="h6" className={classes.title}>
          If you want to try and enter, please click the enter button, else
          click the X to go back
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            props.enterNarnia(props.person);
            handleClose();
          }}
        >
          I wish to enter Narnia!!
        </Button>
      </Dialog>
    </div>
  );
}
