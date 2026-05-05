import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/lib/i18n";
import { SiteLayout } from "@/components/SiteLayout";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Destinations from "./pages/Destinations.tsx";
import Tours from "./pages/Tours.tsx";
import Culture from "./pages/Culture.tsx";
import Experience from "./pages/Experience.tsx";
import Planning from "./pages/Planning.tsx";
import Explore from "./pages/Explore.tsx";
import Blog from "./pages/Blog.tsx";
import Contact from "./pages/Contact.tsx";
import { About, Privacy, Terms } from "./pages/StaticPages.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/culture" element={<Culture />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
