import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import NavegationTop from "./Navegation/NavegationTop";
import Footer from "./Footer";

const Layout = ({ title, children }) => {
  const router = useRouter();

  //Barra de carga
  useEffect(() => {
    const handleRouteChange = (url) => {
      NProgress.start();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", () => NProgress.done());

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>MAKYS {title}</title>
      </Head>

      <NavegationTop />

      <main className="w-[100%] px-6 py-2 mt-24">{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
