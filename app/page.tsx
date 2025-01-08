/* eslint-disable prettier/prettier */
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <>
      
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 px-4 md:px-10">
        <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
        <TaskForm />
        <TaskList />
      </section>
    </>
  );
}
