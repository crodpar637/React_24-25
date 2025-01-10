import { useState } from 'react';
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
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function Menu() {
    const [openBasic, setOpenBasic] = useState(false);

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <Link to="/">
                    <MDBNavbarBrand>Tienda informática</MDBNavbarBrand>
                </Link>

                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenBasic(!openBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar open={openBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                                    Componentes
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <Link to="altacomponente"><MDBDropdownItem link>Alta de componentes</MDBDropdownItem></Link>
                                    <Link to="graficacomponente"><MDBDropdownItem link>Gráfica de componente</MDBDropdownItem></Link>
                                    <Link to="listadocomponente"> <MDBDropdownItem link>Listado de componentes</MDBDropdownItem></Link>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>


                    </MDBNavbarNav>

                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Menu;