
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "./lib/queryClient";

import CardEditor from "./pages/card-editor";
import NotFound from "./pages/not-found";

function App() {
  const renderParticles = () =>
    Array.from({ length: 50 }, (_, i) => {
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const animationDelay = `${Math.random() * 3}s`;
      const animationDuration = `${2 + Math.random() * 3}s`;

      return (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
          style={{ left, top, animationDelay, animationDuration }}
        />
      );
    });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {renderParticles()}
          </div>

          <Toaster />

          <Switch>
            <Route path="/" component={CardEditor} />
            <Route path="/editor/:id?" component={CardEditor} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
