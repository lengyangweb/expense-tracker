import "./globals.css";
import "primeicons/primeicons.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.css";
import { Poppins } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Expense Tracker",
  description: "An expense tracker web application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <PrimeReactProvider>
          <div className="d-flex">
            <Header />
            <ToastContainer style={{ marginTop: "60px" }} />
            <div className="container-fluid">{children}</div>
          </div>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
