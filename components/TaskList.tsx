/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Input, Textarea } from "@nextui-org/input";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@nextui-org/button";

import api from "@/api/api";

interface TaskListProps {
  refresh: boolean;
}

interface Task {
  _id: string;
  name: string;
  description: string;
  deadlineDate: string;
  deadlineTime: string;
}

const TaskList: React.FC<TaskListProps> = ({ refresh }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);

  useEffect(() => {
    api
      .get("/tasks")
      .then((response) => setTasks(response.data))
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, [refresh]);

  const deleteTask = (id: string) => {
    api
      .delete(`/tasks/${id}`) // Delete task by ID
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((err) => console.error("Failed to delete task", err));
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task); // Set the task to be edited
    setUpdatedTask({ ...task }); // Prepare a copy for editing
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (updatedTask) {
      setUpdatedTask({ ...updatedTask, [name]: value });
    }
  };

  const handleUpdateTask = () => {
    if (updatedTask && updatedTask._id) {
      api
        .put(`/tasks/${updatedTask._id}`, updatedTask) // Update task
        .then((response) => {
          setTasks(
            tasks.map((task) =>
              task._id === updatedTask._id ? updatedTask : task
            )
          );
          setEditingTask(null); // Close edit form
        })
        .catch((err) => console.error("Failed to update task", err));
    }
  };

  return (
    <div className="max-w-4xl w-full mt-5">
      <h2 className="text-xl text-center font-semibold mb-4">Task List</h2>
      <Accordion variant="shadow">
        {tasks.map((task) => (
          <AccordionItem key={task._id} title={task.name}>
            <div>
              <p>Deskripsi Tugas : {task.description}</p>
              <p>
                {" "}
                Deadline :{" "}
                {format(new Date(task.deadlineDate), "eeee, dd MMMM yyyy", {
                  locale: id,
                })}
              </p>
              <p>Pukul: {task.deadlineTime} WIB</p>
            </div>

            {/* Edit and Delete buttons */}
            <div className="flex space-x-2 mt-4">
              <Button color="primary" onPress={() => handleEditClick(task)}>
                Edit
              </Button>
              <Button color="danger" onPress={() => deleteTask(task._id)}>
                Delete
              </Button>
            </div>

            {/* Edit Task Form */}
            {editingTask && editingTask._id === task._id && (
              <div className="mt-6 p-6 rounded-md shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Edit Task</h3>

                <div className="space-y-4">
                  <div>
                    <Input
                      fullWidth
                      aria-label="Task Name"
                      label="Task Name"
                      name="name"
                      value={updatedTask?.name || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Textarea
                      fullWidth
                      aria-label="Description"
                      label="Description"
                      name="description"
                      value={updatedTask?.description || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        fullWidth
                        aria-label="Deadline Date"
                        label="Deadline Date"
                        name="deadlineDate"
                        type="date"
                        value={updatedTask?.deadlineDate || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Input
                        fullWidth
                        aria-label="Deadline Time"
                        label="Deadline Time"
                        name="deadlineTime"
                        type="time"
                        value={updatedTask?.deadlineTime || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <Button color="primary" onPress={handleUpdateTask}>
                    Update Task
                  </Button>
                  <Button color="default" onPress={() => setEditingTask(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TaskList;
