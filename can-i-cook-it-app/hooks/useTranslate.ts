import { useEffect, useState } from "react";
import * as Localization from "expo-localization";
import translate from "google-translate-api-axios";

const targetLanguageCode = Localization.locale.substring(0, 2);
export const useTranslation = (text: string) => {
  const [translatedText, setTranslatedText] = useState<string>(text);

  useEffect(() => {
    translate(text, { to: targetLanguageCode }).then((res) => {
      setTranslatedText(res.text);
    });
  }, [text, targetLanguageCode]);

  return translatedText;
};

export const t = async (originalText: string) => {
  try {
    const { text } = await translate(originalText ?? " ", {
      to: targetLanguageCode,
    });
    return text;
  } catch (e) {
    console.error(e);
  }
};
