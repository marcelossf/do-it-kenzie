import Input from "../../components/Input";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, InputContainer, TasksContainer } from "./styles";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import Button from "../../components/Button";
import Card from "../../components/Card";
import api from "services/api";
import { toast } from "react-toastify";

function Dashboard({ authenticated }) {
  const [tasks, setTasks] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token")) || ""
  );
  const { register, handleSubmit } = useForm();

  function loadTasks() {
    api
      .get("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })
      .then((resp) => {
        const apiTasks = resp.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTasks(apiTasks);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function onSubmitFunction({ task }) {
    if (!task) {
      return toast.error("Complete o campo para enviar uma tarefa");
    }
    api
      .post(
        "/task",
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => loadTasks());
  }

  function handleCompleted(id) {
    const newTasks = tasks.filter((task) => task._id !== id);

    api.put(
      `/task/${id}`,
      { completed: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(resp => setTasks(newTasks))
  }

  if (!authenticated) {
    return <Redirect to={"/login"} />;
  }

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmitFunction)}>
        <time>7 de maio de 2021</time>
        <section>
          <Input
            icon={FiEdit2}
            register={register}
            name="task"
            placeholder="Nova tarefa"
          />
          <Button type="submit">Adicionar</Button>
        </section>
      </InputContainer>
      <TasksContainer>
        {tasks.map(({ _id, description, createdAt }) => (
          <Card
            key={_id}
            title={description}
            date={createdAt}
            onClick={() => handleCompleted(_id)}
          />
        ))}
      </TasksContainer>
    </Container>
  );
}

export default Dashboard;
