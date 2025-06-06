'use client';

import React, { createContext, useContext } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

type AllergyContextType = {
  allergies: number[];
  setAllergies: React.Dispatch<React.SetStateAction<number[]>>;
};

const AllergyContext = createContext<AllergyContextType | undefined>(undefined);

export function AllergyProvider({ children }: { children: React.ReactNode }) {
  const [allergies, setAllergies] = useLocalStorage<number[]>('allergies', []);

  const safeAllergies = Array.isArray(allergies) ? allergies : [];

  return (
    <AllergyContext.Provider value={{ allergies: safeAllergies, setAllergies }}>
      {children}
    </AllergyContext.Provider>
  );
}

export const useAllergy = (): AllergyContextType => {
  const context = useContext(AllergyContext);
  if (!context)
    throw new Error('useAllergy must be used within an AllergyProvider');
  return context;
};
