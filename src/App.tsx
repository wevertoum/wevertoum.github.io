import { Toaster } from "@/components/ui/sonner";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { PortfolioPage } from "@/pages/PortfolioPage";

function App() {
  useDocumentMeta();

  return (
    <>
      <PortfolioPage />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
