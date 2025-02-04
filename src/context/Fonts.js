import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Fonts = ["Sans Serif", "Serif", "Mono"];
const FontContext = createContext({
  font: Fonts[0],
  setFont: () => {},
  loading: true,
  fontList: Fonts,
});

const FontProvider = ({ children }) => {
  const [font, setFont] = useState(Fonts[0]);
  const [loading, setLoading] = useState(true);
  const [fontList, setFontList] = useState(Fonts);

  // Load the font from async storage
  useEffect(() => {
    AsyncStorage.getItem("@user_preferred_font")
      .then((storedFont) => {
        if (storedFont) {
          setFont(storedFont);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Save the font to async storage
  useEffect(() => {
    AsyncStorage.setItem("@user_preferred_font", font);
  }, [font]);

  // Return the context provider
  return (
    <FontContext.Provider value={{ font, setFont, loading, fontList }}>
      {children}
    </FontContext.Provider>
  );
};

export { FontContext, FontProvider, Fonts };
