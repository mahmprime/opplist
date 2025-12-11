import Header from "@/components/Header";
import OppList from "@/components/OppList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scanlines">
      <Header />
      <main>
        <OppList />
      </main>
    </div>
  );
};

export default Index;
