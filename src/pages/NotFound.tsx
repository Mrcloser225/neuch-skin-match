
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Logo size="lg" className="mb-10" />
        
        <motion.div
          className="max-w-md space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-medium text-neuch-900">Page not found</h1>
          <p className="text-neuch-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Button 
            variant="neu" 
            className="mt-8" 
            onClick={() => navigate("/")}
            icon={<ArrowLeft size={18} />}
          >
            Return to Home
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
