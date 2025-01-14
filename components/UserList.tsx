/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
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
        <TableColumn className="font-bold text-center">Name</TableColumn>
        <TableColumn className="font-bold text-center">Phone Number</TableColumn>
        <TableColumn className="font-bold text-center">Email</TableColumn>
        <TableColumn className="font-bold text-center">Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="text-center">{user.name}</TableCell>
            <TableCell className="text-center">{user.phoneNumber}</TableCell>
            <TableCell className="text-center">{user.email}</TableCell>
            <TableCell className="text-center">
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
