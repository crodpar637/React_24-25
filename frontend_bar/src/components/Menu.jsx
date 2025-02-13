import {
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link } from "react-router";
import logo from "../assets/images/logo.png";
import { apiUrl } from "../config";
import useUserStore from "../stores/useUserStore";
import { useNavigate } from "react-router";

function Menu() {
  const [openBasic, setOpenBasic] = useState(false);
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(apiUrl + "/users/logout", {
        method: "POST",
        credentials: "include", // Necesario para enviar cookies
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.mensaje);
        // Limpiar el estado global de autenticación (si usas Zustand, Context, etc.)
        clearUser();
        // Redireccionar al usuario
        navigate("/");
      }
    } catch (error) {
      console.error("Error en logout", error);
    }
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <img src={logo} height="30" alt="" loading="lazy" />
          Bar Boom Bun
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic} className="w-100">
          {/* Contenedor principal para el menú y los botones */}
          <MDBNavbarNav className="w-100 d-flex justify-content-between align-items-center">
            {/* Menú de la izquierda */}
            <div className="d-flex">
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Tapas
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {user !== undefined && (
                      <Link to="/altaplato" style={{ color: "#4f4f4f" }}>
                        <MDBDropdownItem link>Alta de platos</MDBDropdownItem>
                      </Link>
                    )}
                    <Link to="/listadoplatos" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de platos</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Pedidos
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {user !== undefined ? (
                      <MDBDropdownItem link>
                        Alta de pedidos (no implementado)
                      </MDBDropdownItem>
                    ) : null}
                    <Link to="/listadopedidos" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de pedidos</MDBDropdownItem>
                    </Link>
                    {user !== undefined ? (
                      <>
                        <Link to="/pedidomultiple" style={{ color: "#4f4f4f" }}>
                          <MDBDropdownItem link>
                            Pedido múltiple
                          </MDBDropdownItem>
                        </Link>
                        <Link to="/graficapedidos" style={{ color: "#4f4f4f" }}>
                          <MDBDropdownItem link>
                            Grafica de pedidos
                          </MDBDropdownItem>
                        </Link>
                      </>
                    ) : null}
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </div>

            {/* Botones alineados a la derecha */}
            <div className="d-flex justify-content-end">
              
                  <Link to="/signup">
                    <MDBBtn size="sm" className="me-2">
                      SignUp
                    </MDBBtn>
                  </Link>
                  <Link to="/login">
                    <MDBBtn size="sm">Login</MDBBtn>
                  </Link>
               
             
                
                  {/* <span className="mx-2">Hola, {user.username}</span>
                  <MDBBtn size="sm" color="danger" onClick={logout}>
                    Logout
                  </MDBBtn> */}
               
            
            </div>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
export default Menu;
