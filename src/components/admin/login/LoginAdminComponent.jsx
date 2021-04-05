import React from "react";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SubmitButton from "../../common/SubmitButton";
import { Footer } from "../../layout";
import resource from "../../../resources/resource";

function LoginComponent(props) {
  const { formData, formRules, loadingPost, failedLogin } = props;

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SupervisorAccountIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              error={!formRules.username.valid}
              helperText={formRules.username.message}
              fullWidth
              onChange={props.handleChange}
              value={formData.username}
              id="username"
              label="NT ID"
              name="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              error={!formRules.password.valid}
              helperText={formRules.password.message}
              onChange={props.handleChange}
              value={formData.password}
              id="password"
              label="Password"
              name="password"
              type="password"
            />
            <div>
              <FormHelperText error style={{ textAlign: "center" }}>
                {failedLogin}
              </FormHelperText>
            </div>
            <SubmitButton
              loading={loadingPost}
              disabled={false}
              onClick={props.handleSubmit}
              label={"Login"}
            />
            <Box mt={5}>
              <Footer />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${resource.background_img})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  }
}));

export default LoginComponent;
