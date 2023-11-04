import {PropsWithChildren, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Button, Col, Container, Row} from "react-bootstrap";


let userClaims:any = null;

(async function () {
  var req = new Request("/bff/user", {
    headers: new Headers({
      "X-CSRF": "1",
    }),
  });

  try {
    var resp = await fetch(req);
    if (resp.ok) {
      userClaims = await resp.json();

      console.log("user logged in", userClaims);
    } else if (resp.status === 401) {
      console.log("user not logged in");
    }
  } catch (e) {
    console.log("error checking user status");
  }
})();

function login() {
  window.location.href = "/bff/login";
}

function logout() {
  if (userClaims) {
    var logoutUrl = userClaims.find(
      (claim) => claim.type === "bff:logout_url"
    ).value;
    window.location = logoutUrl;
  } else {
    window.location.href = "/bff/logout";
  }
}

function DisplayContainer(props:PropsWithChildren) {
  return (
    <Container>
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </Container>
  )
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <DisplayContainer>
      <Button variant="outline-primary" onClick={() => login()}>
        login
      </Button>
      <Button variant="outline-secondary" onClick={() => logout()}>
        logout
      </Button>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React hot</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </DisplayContainer>
  )
}

export default App
