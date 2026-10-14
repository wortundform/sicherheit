// ============================================================================
// config.js – C.F. Maier Sicherheitsunterweisungs-App
// Zentrale Konfiguration: Video-URLs, Forms-Links, Texte pro Sprache
// ============================================================================

// Video-URLs (Cloudinary CDN)
const VIDEOS = {
  de: "https://res.cloudinary.com/dt0u20yez/video/upload/v1778250995/cfm_sicherheitunterweisung_de_gqtjuy.mp4",
  en: "https://res.cloudinary.com/dt0u20yez/video/upload/v1778251014/cfm_sicherheitunterweisung_en_prlc6d.mp4",
  fr: "https://res.cloudinary.com/dt0u20yez/video/upload/v1778251032/cfm_sicherheitunterweisung_fr_llw8bp.mp4",
  es: "https://res.cloudinary.com/dt0u20yez/video/upload/v1778250992/cfm_sicherheitunterweisung_esp_ul0bqo.mp4",
  ru: "https://res.cloudinary.com/dt0u20yez/video/upload/v1778251071/cfm_sicherheitunterweisung_ru_jnuuc5.mp4",
  hu: "https://res.cloudinary.com/dt0u20yez/video/upload/v1778251089/cfm_sicherheitunterweisung_hu_xpldff.mp4",
  tr: "https://res.cloudinary.com/dt0u20yez/video/upload/v1778250987/cfm_sicherheitunterweisung_tu_hhpghe.mp4"
};

// Forms-Links (neue URL-Struktur)
const FORMS_URLS = {
  de: "https://eu.forms.app/cfmaier/sicherheit-de",
  en: "https://eu.forms.app/cfmaier/sicherheit-en",
  fr: "https://eu.forms.app/cfmaier/sicherheit-fr",
  es: "https://eu.forms.app/cfmaier/sicherheit-es",
  ru: "https://eu.forms.app/cfmaier/sicherheit-ru",
  hu: "https://eu.forms.app/cfmaier/sicherheit-hu",
  tr: "https://eu.forms.app/cfmaier/sicherheit-tr"
};

// Texte pro Sprache
const CONTENT = {
  de: {
    title: "Sicherheitseinweisung",
    instruction: "Bitte schauen Sie sich das komplette Sicherheitsvideo an.",
    back: "Zurück",
    continue: "Weiter zum Formular",
    skipWarn: "⚠️ Bitte schauen Sie ab hier.",
    tabWarn: "⚠️ Sie haben diesen Tab verlassen."
  },
  en: {
    title: "Safety Briefing",
    instruction: "Please watch the full safety video.",
    back: "Back",
    continue: "Continue to Form",
    skipWarn: "⚠️ Please watch from where you left off.",
    tabWarn: "⚠️ You left this tab."
  },
  fr: {
    title: "Briefing de Sécurité",
    instruction: "Veuillez regarder l'intégralité de la vidéo de sécurité.",
    back: "Retour",
    continue: "Continuer vers le formulaire",
    skipWarn: "⚠️ Veuillez regarder à partir d'ici.",
    tabWarn: "⚠️ Vous avez quitté cet onglet."
  },
  es: {
    title: "Briefing de Seguridad",
    instruction: "Por favor, mire el video de seguridad completo.",
    back: "Atrás",
    continue: "Continuar al formulario",
    skipWarn: "⚠️ Por favor, vea desde aquí.",
    tabWarn: "⚠️ Ha dejado esta pestaña."
  },
  ru: {
    title: "Инструктаж по безопасности",
    instruction: "Пожалуйста, посмотрите полное видео по безопасности.",
    back: "Назад",
    continue: "Перейти к форме",
    skipWarn: "⚠️ Пожалуйста, смотрите отсюда.",
    tabWarn: "⚠️ Вы покинули эту вкладку."
  },
  hu: {
    title: "Biztonsági Tájékoztatás",
    instruction: "Kérjük, nézze meg a teljes biztonsági videót.",
    back: "Vissza",
    continue: "Folytatás az űrlaphoz",
    skipWarn: "⚠️ Kérjük, onnan nézze meg.",
    tabWarn: "⚠️ Elhagyta ezt a lapot."
  },
  tr: {
    title: "Güvenlik Sunumu",
    instruction: "Lütfen tam güvenlik videosunu izleyin.",
    back: "Geri",
    continue: "Forma Devam Et",
    skipWarn: "⚠️ Lütfen buradan itibaren izleyin.",
    tabWarn: "⚠️ Bu sekmeyi terk ettiniz."
  }
};
