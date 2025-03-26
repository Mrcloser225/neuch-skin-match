
import { Check, Globe } from "lucide-react";
import { useLanguage, LANGUAGES, type LanguageCode } from "@/contexts/LanguageContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`flex items-center text-sm text-neuch-500 hover:text-neuch-700 transition-colors ${className}`}>
        <Globe size={16} className="mr-1" />
        <span className="hidden sm:inline">{LANGUAGES[language].nativeName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto">
        {Object.entries(LANGUAGES).map(([code, { nativeName }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as LanguageCode)}
            className="flex items-center justify-between"
          >
            <span>{nativeName}</span>
            {code === language && <Check size={16} className="ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
