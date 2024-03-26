import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";

const navStyle = {
  width: "12rem",
  background: '#0449ab',
  height: '100vh'
}

const Header = () => {
  return (
    <Navbar className="d-flex flex-column px-3" style={ navStyle }>
      <span className="text-center pb-2 fw-bold fs-5 border border-2 border-start-0 border-end-0 border-top-0">
        <Link href="/home" className="text-light text-decoration-none">
          Expense Tracker
        </Link>
      </span>
      <Nav className="gap-2 mt-4">
        <div className="d-flex flex-column gap-2">
          <Link href="/about" className="text-light text-decoration-none">
            About
          </Link>
          <Link href="/tracker" className="text-light text-decoration-none">
            Tracker
          </Link>
        </div>
      </Nav>
      <span className="text-light">&copy;{new Date().getFullYear()}</span>
    </Navbar>
  );
};

export default Header;
