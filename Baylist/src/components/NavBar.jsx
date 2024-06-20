import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../assets/baylistlogo.png';
import '../scss/styles.scss' //Import SCSS styling variables

function NavBar() {
    return (
        <Navbar className="bg-nav-purple" expand="lg" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000}}>
            {/* Will fix inline style with a new file later */}
            <Container fluid>
                <Navbar.Brand href="/"><img src={logo} alt="Logo" style={{ width: '85px', height: 'auto' }} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="w-100 d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2 bg-light-pink flex-grow-1"
                            aria-label="Search"
                        />
                        <Button variant="btn btn-success me-2">Search</Button>
                    </Form>
                    <Nav className="me-auto">
                        {/* Add your navigation links here */}
                    </Nav>
                    <Nav>
                        <Button className="btn" type="button">Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;