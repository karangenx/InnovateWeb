import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us | Innovate Web",
  description: "Get in touch with the Innovate Web community.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-grow pt-[104px]">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
