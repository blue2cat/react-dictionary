import { useContext } from 'react';
import { FontContext} from 'context/Fonts';

export const useCustomFonts = () => {
  const context = useContext(FontContext);

  return {
    font: context.font,
    loading: context.loading,
    setFont: context.setFont,
    fontList: context.fontList,
  };
};

