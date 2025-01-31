import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router";

function Menu() {
  const [openBasic, setOpenBasic] = useState(false);

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
                    <Link to="/altaplato" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de platos</MDBDropdownItem>
                    </Link>
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
                    <MDBDropdownItem link>Alta de pedidos</MDBDropdownItem>
                    <Link to="/listadopedidos" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de pedidos</MDBDropdownItem>
                    </Link>
                    <Link to="/pedidomultiple" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Pedido múltiple</MDBDropdownItem>
                    </Link>
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
            </div>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
export default Menu;
