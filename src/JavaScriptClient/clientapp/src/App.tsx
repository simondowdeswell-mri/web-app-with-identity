import {PropsWithChildren, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {useAuthContext, AuthProvider} from "./auth/AuthUtils.tsx";


function DisplayContainer(props:PropsWithChildren) {
  
  const authContext = useAuthContext();
  
  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              { authContext.userStatus.status === 'authenticated' ?
                <NavDropdown title={authContext.userStatus.PersonName} id="basic-nav-dropdown">
                  <NavDropdown.Item  onClick={() => authContext.logout()}>
                    logout 
                  </NavDropdown.Item>
                </NavDropdown>
                :  
                <Button variant="outline-primary" onClick={() => authContext.login()}>
                  login
                </Button>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>{props.children}</Col>
        </Row>
      </Container>
    </>

  )
}
function AppDisplay() {
  const [count, setCount] = useState(0)

  return (
    <DisplayContainer>
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

function App() {
  return (
    <AuthProvider>
      <AppDisplay />
    </AuthProvider>
    )
}
export default App
