import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Register from "./Register";
import MySnackbarContentWrapper from "./StatusMessage";
import ListUsers from "./ListUsers";
import Grid from "@material-ui/core/Grid";
import Narnia from "./Narnia";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      person: {
        firstName: "",
        lastName: "",
        id: null,
        age: 0,
        error: false,
        message: "",
        tourists: [],
        registered: []
      }
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    this.fetchRegistrations();
    this.fetchTourists();
  };
  fetchRegistrations = async () => {
    try {
      const result = await axios.get("/api/tourists/registered");
      this.setState({ registered: result.data });
    } catch (error) {
      // this.setState({ message: error.response.data.message, error: true });
    }
  };
  fetchTourists = async () => {
    try {
      const result = await axios.get("/api/tourists/inside");
      console.log(result);
      this.setState({ tourists: result.data });
    } catch (error) {
      this.setState({ message: error.response.data.message, error: true });
    }
  };

  enterNarnia = async person => {
    try {
      await axios.post("/api/tourists/add", person);
      this.fetchData();
    } catch (error) {
      console.log(error.response.data);
      this.setState({ message: error.response.data.message, error: true });
    }
  };
  registerPerson = async body => {
    try {
      await axios.post("/api/tourists/register", body);
      this.fetchRegistrations();
      const cleanPerson = {
        firstName: "",
        lastName: "",
        id: null,
        age: 0
      };
      this.setState({ registration: false, person: cleanPerson });
    } catch (error) {
      console.log(error);
      this.setState({ message: error.response.data.message, error: true });
    }
  };
  selectUser = person => {
    this.setState({ person });
  };
  errorSwitch = message => {
    this.setState({ error: true, message });
  };
  closeMessage = () => {
    this.setState({ error: false, message: "" });
  };
  removeUser = async person => {
    try {
      await axios.patch(`/api/tourists/${person.id}`);
      this.fetchData();
    } catch (error) {
      console.log(error.response.data);
      this.setState({ message: error.response.data.message, error: true });
    }
  };
  render() {
    return (
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          // alignItems="center"
        >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <img src="download.jpg" alt="closet of narnia" />
            {this.state.error ? (
              <MySnackbarContentWrapper
                variant="error"
                message={this.state.message}
                onClose={this.closeMessage}
              />
            ) : null}
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            Currently selected: {this.state.person.firstName}
            <Narnia person={this.state.person} enterNarnia={this.enterNarnia} />
          </Grid>

          <Grid item xs={6} className="uglyGrid">
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.setState({ registration: !this.state.registration })
              }
            >
              Register new tourist
            </Button>
            {this.state.registration ? (
              <Register
                person={this.state.person}
                register={this.registerPerson}
                error={this.errorSwitch}
              />
            ) : null}
            <h3> People registered for Narnia:</h3>
            <ListUsers
              people={this.state.registered}
              selectUser={this.selectUser}
            />
          </Grid>
          <Grid item xs={6} className="anotherUglyGrid">
            <h3>People currently in Narnia: </h3>
            <ListUsers
              people={this.state.tourists}
              removeUser={this.removeUser}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
