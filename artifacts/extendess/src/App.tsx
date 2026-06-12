import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Team from "@/pages/Team";
import Gallery from "@/pages/Gallery";
import Contacts from "@/pages/Contacts";
import Salons from "@/pages/Salons";
import Price from "@/pages/Price";
import { Layout } from "@/components/Layout";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/team" component={Team} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/salons" component={Salons} />
      <Route path="/price" component={Price} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
