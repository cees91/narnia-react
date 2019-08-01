import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const validateFields = values => {
  const { firstName, lastName, age, city } = values;
  if (firstName !== "" && lastName !== "" && age > 0 && city !== "") {
    return true;
  } else {
    return false;
  }
};
const Register = props => {
  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    city: "",
    id: props.person.id
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="First name"
          className={classes.textField}
          value={values.firstName}
          onChange={handleChange("firstName")}
          margin="normal"
          required
        />
        <TextField
          id="last-name"
          label="Last name"
          className={classes.textField}
          value={values.lastName}
          onChange={handleChange("lastName")}
          margin="normal"
          required
        />
        <TextField
          id="age"
          label="Age"
          className={classes.textField}
          value={values.age}
          onChange={handleChange("age")}
          margin="normal"
          required
        />
        <TextField
          id="age"
          label="City"
          className={classes.textField}
          value={values.city}
          onChange={handleChange("city")}
          margin="normal"
          required
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={() => {
          if (validateFields(values)) {
            props.register(values);
          } else {
            props.error("Please fill out all fields");
          }
        }}
      >
        Submit registration
      </Button>
    </>
  );
};
export default Register;
