import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EditUsers from "./editUsers";

const ListTodos = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const jsonData = await response.json();

      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteUser = async (users_id) => {
    try {
      const deleteUser = await fetch(
        `http://localhost:5000/users/${users_id}`,
        {
          method: "DELETE",
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  });
  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>First Name</b>
            </TableCell>
            <TableCell>
              <b>Email</b>
            </TableCell>
            <TableCell>
              <b>Password</b>
            </TableCell>
            <TableCell>
              <b></b>
            </TableCell>
            <TableCell>
              <b></b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((users) => (
            <TableRow key={users.users_id}>
              <TableCell>{users.first_name}</TableCell>
              <TableCell>{users.email}</TableCell>
              <TableCell>{users.users_password}</TableCell>
              <TableCell>
                <EditUsers users={users} />
              </TableCell>
              <TableCell>
                <Button onClick={() => deleteUser(users.users_id)}>
                  remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTodos;
