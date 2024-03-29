import "./globals.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.css";
import { Poppins } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
        <Header />
        <ToastContainer style={{ marginTop: "60px" }} />
        <div className="container-fluid">{children}</div>
      </body>
    </html>
  );
}
