import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className="d-flex flex-column bg-secondary">
      <h5>
        <Link href="/about" className="text-light text-decoration-none">
          Expense Tracker
        </Link>
      </h5>
      <Nav className="gap-2">
        <Link href="/about" className="text-light">
          About
        </Link>
        <Link href="/tracker" className="text-light">
          Tracker
        </Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
