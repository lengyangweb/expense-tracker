import "./globals.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "bootstrap/dist/css/bootstrap.css";

import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider } from "primereact/api";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "expTracker",
  description: "An expense tracker web application",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <PrimeReactProvider>
            <ToastContainer />
            {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
