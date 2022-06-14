import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AnimationContainer, Background, Content } from "./styles";
import { Container } from "./styles";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "services/api";
import { toast } from "react-toastify";

function SignUp({ authenticated }) {
  const schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório!"),
    email: yup.string().required("E-mail obrigatório!"),
    password: yup
      .string()
      .min(8, "Minimo de 8 dígitos")
      .required("Password obrigatório!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes!")
      .required("Campo Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  function onSubmitFunction({ name, email, password }) {
    const user = {
      name,
      email,
      password,
    };
    api
      .post("./user/register", user)
      .then((_) => {
        toast.success("Sucesso ao criar a conta");
        setTimeout(() => {
          history.push("/login");
        }, 7000);
      })
      .catch((err) => toast.error("Erro ao criar a conta. Tente outro e-mail"));
  }

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <Container>
        <Background />
        <Content>
          <AnimationContainer>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <h1>Cadastro</h1>
              <Input
                icon={FiUser}
                label="Nome"
                placeholder="Nome"
                register={register}
                name="name"
                error={errors?.name?.message}
              />
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
              <Input
                icon={FiLock}
                label="Confirmação de Senha"
                placeholder="Confirmação de Senha"
                type="password"
                register={register}
                name="confirmPassword"
                error={errors?.confirmPassword?.message}
              />
              <Button type="submit">Enviar</Button>
              <p>
                Já tem uma conta? <Link to="/login">Faça seu login</Link>
              </p>
            </form>
          </AnimationContainer>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
