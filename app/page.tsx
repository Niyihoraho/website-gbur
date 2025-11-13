import Navbar from "./components/navbar";
import Header from "./components/header";
import Iam from "./components/iam";
import AboutUs from "./components/aboutUs";
import Involved from "./components/involved";
import FromtheBlog from "./components/FromtheBlog";
import Footer from "./components/footer";
import FloatingActionButton from "./components/FloatingActionButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Iam />
      <AboutUs />
      <Involved />
      <FromtheBlog />
      <FloatingActionButton />
      <Footer />
    </>
  );
}
