
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  
  return (
    <div className="flex items-center">
      <Select value={language} onValueChange={(value: string) => {
        if (value !== language) {
          toggleLanguage();
        }
      }}>
        <SelectTrigger className="w-[100px] h-8">
          <SelectValue placeholder={t('language')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="id">Indonesia</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageToggle;
