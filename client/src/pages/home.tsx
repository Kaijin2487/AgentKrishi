import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ChatInterface from "@/components/chat-interface";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <div className="mb-16">
        <ChatInterface />
      </div>
      <Footer />
    </div>
  );
}
