"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";

import api from "@/api/api";

type User = {
  _id: string;
  name: string;
};

type Task = {
  name: string;
  description: string;
  deadlineDate: string;
  deadlineTime: string;
  users: string[];
};

const TaskForm: React.FC = () => {
  const [task, setTask] = useState<Task>({
    name: "",
    description: "",
    deadlineDate: "",
    deadlineTime: "",
    users: [],
  });
  const [users, setUsers] = useState<User[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // Track checkbox state

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUserSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    setIsCheckboxChecked(isChecked); // Update checkbox state

    // If checkbox is checked, assign all users
    if (isChecked) {
      const selectedUsers = users.map((user) => user._id);

      setTask((prevTask) => ({
        ...prevTask,
        users: selectedUsers,
      }));
    } else {
      setTask((prevTask) => ({
        ...prevTask,
        users: [], // Clear users if unchecked
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent form submission if checkbox is not checked
    if (!isCheckboxChecked) {
      alert("Please select the checkbox to assign users.");

      return;
    }

    api
      .post("/tasks", task)
      .then(() => alert("Task Created"))
      .catch((err) => console.error("Failed to create task:", err));
  };

  return (
    <form className="space-y-6 max-w-4xl w-full" onSubmit={handleSubmit}>
      <Input
        fullWidth
        required
        label="Task Name"
        name="name"
        placeholder="Task Name"
        type="text"
        value={task.name}
        onChange={handleInputChange}
      />

      <Textarea
        fullWidth
        required
        label="Description"
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleInputChange}
      />

      <Input
        fullWidth
        required
        label="Deadline Date"
        name="deadlineDate"
        type="date"
        value={task.deadlineDate}
        onChange={handleInputChange}
      />

      <Input
        fullWidth
        required
        label="Deadline Time"
        name="deadlineTime"
        type="time"
        value={task.deadlineTime}
        onChange={handleInputChange}
      />

      <Checkbox
        required
        color="primary"
        isSelected={isCheckboxChecked}
        onChange={handleUserSelection}
      >
        Assign to All Users
      </Checkbox>

      <Button fullWidth color="primary" type="submit">
        Create Task
      </Button>
    </form>
  );
};

export default TaskForm;
