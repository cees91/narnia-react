import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function ListUsers(props) {
  const { people } = props;
  return (
    <List component="nav" aria-label="main mailbox folders">
      {people
        ? people.map(tourist => {
            return (
              <ListItem key={tourist.id}>
                <Paper style={{ width: "300px" }}>
                  <Typography variant="h5" component="h3">
                    Name: {tourist.firstName} {tourist.lastName}
                  </Typography>
                  <Typography component="p">
                    Age: {tourist.age} from {tourist.city}
                  </Typography>
                  <div style={{ textAlign: "center" }}>
                    {props.selectUser ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => props.selectUser(tourist)}
                      >
                        Select {tourist.firstName}
                      </Button>
                    ) : null}
                    {props.removeUser ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => props.removeUser(tourist)}
                      >
                        Leave Narnia :(
                      </Button>
                    ) : null}
                  </div>
                </Paper>
              </ListItem>
            );
          })
        : null}
    </List>
  );
}
