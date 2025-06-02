
import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  color?: "light" | "dark";
  className?: string;
}

const Logo = ({ size = "md", color = "dark", className = "" }: LogoProps) => {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl", 
    lg: "text-4xl",
  };

  const colors = {
    light: "text-white",
    dark: "text-neuch-950",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`font-lexend font-semibold tracking-tight ${sizes[size]} ${colors[color]} ${className}`}
    >
      Neuch<span className="bg-gradient-to-r from-amber-200 via-orange-300 via-amber-400 via-orange-500 via-amber-600 via-orange-700 to-amber-900 bg-clip-text text-transparent">.</span>
    </motion.div>
  );
};

export default Logo;
