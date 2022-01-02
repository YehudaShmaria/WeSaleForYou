import './nav.css'
import { useContext, useEffect,useState } from "react"
import {Container,NavDropdown,Nav,Navbar,Form,FormControl,Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { userContext } from '../Auto/userContext'
import utils from '../../utils'
import { useHistory } from 'react-router'

const NavCom = () =>
{
    const [category,setCategory] = useState([]);
    const {user,setUser} = useContext(userContext);
    const [type, setType] = useState(false);
    const history = useHistory();

    useEffect(async()=>
    {
        let res =  await utils.GetAllItems("http://localhost:5000/category");
        setCategory(res.data);
    },[])

    useEffect(()=>
    {
        if(user)
        {
            user.Type == "Saller" ? setType(true) : setType(false);
        }
        else
            setType(false);
    },[user])

    const Logout = () =>
    {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
        history.push('/')
    }

    return(
        <div>
            <Navbar className="sticky-top" sticky="top" bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">WSFY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '150px' }}
                        navbarScroll
                    >
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/#">
                            <Nav.Link>Yad 2</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/#">
                            <Nav.Link>SRS</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Products" id="navbarScrollingDropdown">
                        {
                            category.map((item,index)=>
                            {
                                return <NavDropdown.Item key={index}>{item.Name}</NavDropdown.Item>
                            })
                        }
                        <NavDropdown.Divider />
                        <LinkContainer to="/products">
                            <NavDropdown.Item>
                            All Products
                            </NavDropdown.Item>
                        </LinkContainer>
                        </NavDropdown>
                        <LinkContainer to="/sallers">
                            <Nav.Link>Sallers</Nav.Link>
                        </LinkContainer>
                        {
                            type ? <>
                              <LinkContainer to="/mangeproduct/saller">
                                <Nav.Link>Saller Account</Nav.Link>
                            </LinkContainer></>:<LinkContainer to="createsaller"><Nav.Link>Become A Saller!</Nav.Link></LinkContainer> 
                        }
                           
                    </Nav>                   
                    <Form style={{marginRight:"20px"}} className="d-flex mr-auto ml-auto">
                        <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav>
                    <LinkContainer className="icon" to="/#">
                        <Nav.Link><i class='fas fa-shopping-cart' style={{fontSize:'24px'}}></i></Nav.Link>
                    </LinkContainer>
                    {
                        user ? <><LinkContainer className="icon" to="/messenger">
                        <Nav.Link><i className='far fa-comments' style={{fontSize:'24px'}}></i></Nav.Link>
                    </LinkContainer>
                    <LinkContainer className="icon" to="/profile">
                        <Nav.Link>{user.Type} <i className='far fa-user-circle' style={{fontSize:'24px'}}></i></Nav.Link>
                    </LinkContainer>
                        <Nav.Link onClick={Logout}><i style={{fontSize:'24px'}} className='fas fa-share-square'></i></Nav.Link>
                    </>:<> <LinkContainer className="icon" to="/login">
                    <Nav.Link>Login <i style={{fontSize:'24px'}} className='fas fa-sign-in-alt'></i></Nav.Link>
                    </LinkContainer>
                    <LinkContainer className="icon" to="/register">
                         <Nav.Link>Register <i style={{fontSize:'24px'}} className='fas fa-edit'></i></Nav.Link>
                    </LinkContainer>
                    </>
                    }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </div>
    )
}
export default NavCom