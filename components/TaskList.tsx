"use client";
import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Import the Indonesian locale

interface Task {
  deadlineDate: string;
  _id: string;
  name: string;
  description: string;
  deadlineTime: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/tasks") // API route that returns tasks
      .then((response) => setTasks(response.data))
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, []);

  const deleteTask = (id: string) => {
    axios
      .delete(`http://localhost:4000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((err) => console.error("Failed to delete task", err));
  };

  return (
    <div className="max-w-4xl w-full">
      <h2 className="text-xl font-semibold mb-4">Task List</h2>
      <Accordion>
        {tasks.map((task) => (
          <AccordionItem key={task._id} title={task.name}>
            <div>
              <p>{task.description}</p>
              <p>
                {format(new Date(task.deadlineDate), "eeee, dd MMMM yyyy", { locale: id })}
              </p>
              <p>Pukul: {task.deadlineTime}</p>
            </div>
            <Button color="danger" onPress={() => deleteTask(task._id)}>
              Delete
            </Button>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TaskList;
