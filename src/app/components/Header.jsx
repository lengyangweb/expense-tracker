import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import MenuFooter from "./MenuFooter";

const navStyle = {
  width: "12rem",
  background: '#0059b3',
  height: '100vh',
}

const Header = () => {
  return (
    <Navbar className="d-flex flex-column"style={ navStyle }>
      <div className="d-flex flex-column align-items-center w-100">
        <span className="text-center w-75 pb-2 fw-bold fs-5 border border-2 border-start-0 border-end-0 border-top-0">
          <Link href="/home" className="text-light text-decoration-none">
            <i>Exp</i>Tracker
          </Link>
        </span>
        <Nav className="mt-4">
          <div className="d-flex flex-column align-items-center gap-1">
            <Link href="/about" className="text-light text-decoration-none">About</Link>
            <Link href="/tracker" className="text-light text-decoration-none">Tracker</Link>
          </div>
        </Nav>
      </div>
      <div className="position-absolute bottom-0 w-100">
        <MenuFooter />
      </div>
      {/* <span className="text-light text-center py-2 fixed-bottom" style={{ width: '10.5rem' }}>&copy;{new Date().getFullYear()}</span> */}
    </Navbar>
  );
};

export default Header;
