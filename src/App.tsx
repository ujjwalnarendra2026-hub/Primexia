import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import BusinessStructurePage from "./pages/BusinessStructurePage";
import OperatingFocusPage from "./pages/OperatingFocusPage";
import VenturesPage from "./pages/VenturesPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import PageLayout from "./components/PageLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
          <Route path="/business-structure" element={<PageLayout><BusinessStructurePage /></PageLayout>} />
          <Route path="/operating-focus" element={<PageLayout><OperatingFocusPage /></PageLayout>} />
          <Route path="/ventures" element={<PageLayout><VenturesPage /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
          <Route path="/privacy-policy" element={<PageLayout><PrivacyPolicyPage /></PageLayout>} />
          <Route path="/terms" element={<PageLayout><TermsPage /></PageLayout>} />
          <Route path="/admin" element={<AdminPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
