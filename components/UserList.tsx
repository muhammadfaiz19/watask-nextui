/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
}

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  return (
    <Table
      isCompact
      aria-label="User List"
      className="w-full overflow-x-auto"
      shadow="md"
    >
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Phone Number</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Button
                className="text-xs"
                color="danger"
                onPress={() => onDelete(user._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
