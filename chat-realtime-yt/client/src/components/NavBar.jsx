import { useContext } from "react";
import {Container, Nav, Navbar, Stack} from "react-bootstrap"
import {Link} from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const {user, logoutUser} = useContext(AuthContext)

        return (<Navbar className="mb-4" style={{height:"3.75rem", background: "#f4f4f4"}}>
        <Container>
            <h2>
                <Link to="/" className="link-dark text-decoration-none"> Papo-Literário</Link>
            </h2>
            {user && (
             <span style={{color: "#5e5ce6"}}>{user?.name} está logado</span>
             )}
            <Nav>
                <Stack direction="horizontal" gap={4}>
                    {
                        user && (<>
                        <Link onClick={() => logoutUser()} to="/login" className="link-dark text-decoration-none"> 
                            Logout
                        </Link>
                        </>)
                    }
                    {!user && (
                    <>
                        <Link to="/register" className="link-dark text-decoration-none"> 
                            Register
                        </Link>
                        <Link to="/login" className="text-decoration-none"style={{color: "#ff6f61"}}> 
                            Login
                        </Link>
                        </>
                        )}
                </Stack> 
           </Nav>
        </Container>
    </Navbar>);
}
 
export default NavBar;
