import {PropsWithChildren} from 'react'
import './App.css';
import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {useAuthContext, AuthProvider} from "./auth/AuthUtils.tsx";
import {useData} from "./utilities/data/DataUtilities.tsx";


type HomeData = {
  companyName: string;
  companyId: number;
}
function HomeView() {
  const authContext = useAuthContext();

  const homeContext = useData<HomeData>('/remote/home');
  return (
    <div>
      {authContext.userStatus.status === 'authenticated' ?
          <div>
            <h1>{authContext.userStatus.PersonName}</h1>
            <p>{homeContext.kind === 'empty'
            ? (<span>Nothing</span>)
            : (<span>{homeContext.result.companyName}</span>)}</p>
          </div>
          :
          <h1>Please login</h1>
      }
    </div>
  )
}

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
  //const [count, setCount] = useState(0)

  return (
    <DisplayContainer>
      <div>
        <HomeView />
      </div>
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
