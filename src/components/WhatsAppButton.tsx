import { useTranslation } from "react-i18next";

const PHONE = (import.meta.env.VITE_WHATSAPP_NUMBER || "+251911000000").replace(/[^\d]/g, "");

export const WhatsAppButton = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const msg = encodeURIComponent("Hello, I'm interested in a tour package from Konjit Ethiopia");
  const href = `https://wa.me/${PHONE}?text=${msg}`;
  const label = t("whatsapp.tooltip", "Chat with us on WhatsApp");

  return (
    <>
      <style>{`
        @keyframes wa-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        .wa-fab { animation: wa-pulse 2s ease-in-out infinite; }
        .wa-fab:hover { animation: none; transform: scale(1.1); filter: drop-shadow(0 8px 20px rgba(37,211,102,0.5)); }
        .wa-fab-tip { opacity: 0; pointer-events: none; transition: opacity .2s ease; }
        .wa-wrap:hover .wa-fab-tip { opacity: 1; }
      `}</style>
      <div
        className="wa-wrap"
        style={{
          position: "fixed",
          bottom: 24,
          [isRTL ? "left" : "right"]: 24,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexDirection: isRTL ? "row-reverse" : "row",
        } as React.CSSProperties}
      >
        <span
          className="wa-fab-tip"
          style={{
            background: "rgba(15,23,42,0.92)",
            color: "white",
            fontSize: 13,
            fontWeight: 500,
            padding: "8px 12px",
            borderRadius: 9999,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {label}
        </span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="wa-fab"
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#25D366",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 18px rgba(37,211,102,0.45)",
            transition: "transform .25s ease, filter .25s ease",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.9c0 2.09.55 4.13 1.6 5.93L0 24l6.34-1.66a11.86 11.86 0 0 0 5.71 1.46h.01c6.56 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.44-8.42zM12.06 21.5h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.76.99 1-3.67-.23-.38a9.55 9.55 0 0 1-1.46-5.07c0-5.27 4.29-9.56 9.57-9.56 2.55 0 4.95 1 6.76 2.8a9.5 9.5 0 0 1 2.8 6.77c0 5.28-4.29 9.57-9.42 9.67zm5.26-7.16c-.29-.14-1.7-.84-1.97-.94-.26-.1-.46-.14-.65.14-.19.29-.74.94-.91 1.13-.17.19-.34.21-.62.07-.29-.14-1.21-.45-2.31-1.43-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.4 0 1.41 1.03 2.78 1.17 2.97.14.19 2.02 3.08 4.89 4.32.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.12-.26-.19-.55-.33z"/>
          </svg>
        </a>
      </div>
    </>
  );
};
