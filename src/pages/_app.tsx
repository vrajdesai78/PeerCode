import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-[#1d1d1c] font-lato">
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}
