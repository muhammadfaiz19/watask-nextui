/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";

interface UserFormProps {
  onSubmit: (user: {
    name: string;
    phoneNumber: string;
    email: string;
  }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, email });
    setName("");
    setPhoneNumber("");
    setEmail("");
  };

  return (
    <form
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      onSubmit={handleSubmit}
    >
      <Input
        isClearable
        required
        className="w-full"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        isClearable
        required
        className="w-full"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Input
        isClearable
        required
        className="w-full"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button color="primary" type="submit">
        Add User
      </Button>
    </form>
  );
};

export default UserForm;
