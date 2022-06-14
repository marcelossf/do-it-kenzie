import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AnimationContainer, Background, Content } from "./styles";
import { Container } from "./styles";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "services/api";
import { toast } from "react-toastify";

function Login({ authenticated, setAuthenticaded }) {
  const schema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório!"),
    password: yup
      .string()
      .min(8, "Minimo de 8 dígitos")
      .required("Password obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  function onSubmitFunction(data) {
    api
      .post("/user/login", data)
      .then((resp) => {
        toast.success("Login realizado com sucesso!");
        const { token, user } = resp.data;
        localStorage.setItem("@Doit:token", JSON.stringify(token));
        localStorage.setItem("@Doit:user", JSON.stringify(user))

        setAuthenticaded(true);

        setTimeout(() => {
          history.push("/dashboard");
        }, 7000);
      })
      .catch((error) => toast.error("E-mail ou senha inválidos!"));
  }

  if (authenticated) {
    return <Redirect to='/dashboard'/>

  } else {
    return (
      <Container>
        <Content>
          <AnimationContainer>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <h1>Login</h1>
              <Input
                icon={FiMail}
                label="E-mail"
                placeholder="E-mail"
                register={register}
                name="email"
                error={errors?.email?.message}
              />
              <Input
                icon={FiLock}
                label="Senha"
                placeholder="Uma senha bem segura"
                type="password"
                register={register}
                name="password"
                error={errors?.password?.message}
              />
              <Button type="submit">Enviar</Button>
              <p>
                Não tem conta? <Link to="/signup">Faça seu cadastro</Link>
              </p>
            </form>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
    );
  }
}

export default Login;
