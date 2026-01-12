import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Seo from "../../components/Seo";

export default function Error() {
  return (
    <section>
      <Seo
        title="eMatériel - Error"
        description="La page erreur du site eMatériel."
        url="/error"
      />
      <Navbar />
      <h1>Not Found This Page !</h1>

      <Footer />
    </section>
  )
}
