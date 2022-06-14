import { Container, Content } from "./styles";
import Button from "../../components/Button";
import { useHistory } from "react-router";
import React from "react";
import { Redirect } from "react-router-dom";

function Home({ authenticated }) {
  const history = useHistory();
  const handleNavigation = (path) => {
    console.log("clicou");
    return history.push(path);
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <Container>
        <Content>
          <h1>
            do<span>.</span>it
          </h1>
          <span>Organize-se de forma fácil e efetiva</span>
          <div>
            <Button onClick={() => handleNavigation("/signup")} whiteSchema>
              Cadastre-se
            </Button>
            <Button onClick={() => handleNavigation("/login")}>Login</Button>
          </div>
        </Content>
      </Container>
    );
  }
}

export default Home;
