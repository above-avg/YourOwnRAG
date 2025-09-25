import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-ai-primary/10">
      <div className="text-center animate-fade-in">
        <h1 className="mb-4 text-6xl font-bold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent">
          404
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-ai-primary to-ai-secondary text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Return to Chat
        </a>
      </div>
    </div>
  );
};

export default NotFound;
