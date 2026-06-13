"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */
interface ChatMessage {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  options?: string[];
}

/* ------------------------------------------------------------------ */
/*  CONFIG                                                             */
/* ------------------------------------------------------------------ */
const PHONE = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+251911000000").replace(/[^\d]/g, "");
const COMPANY_NAME = "Konijet Ethiopia";
const AVATAR = <img src="/img/whatsapp-logo.png" alt="Konijet" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />;
const GREETING_DELAY = 600;

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */
const generateId = () => Math.random().toString(36).slice(2, 9);

const formatTime = (d: Date) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */
export const WhatsAppButton = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ---------------- scroll to bottom ---------------- */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  /* ---------------- focus input on open ---------------- */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* ---------------- greeting on first open ---------------- */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: generateId(),
            text: t(
              "whatsapp.greeting1",
              "Hello! Welcome to Konijet Ethiopia."
            ),
            sender: "bot",
            timestamp: new Date(),
          },
          {
            id: generateId(),
            text: t(
              "whatsapp.greeting2",
              "How can we help you today?"
            ),
            sender: "bot",
            timestamp: new Date(),
            options: [
              t("whatsapp.opt_book", "Book a tour"),
              t("whatsapp.opt_pricing", "Pricing & packages"),
              t("whatsapp.opt_inquiry", "General inquiry"),
            ],
          },
        ]);
      }, GREETING_DELAY);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, t]);

  /* ---------------- send user message ---------------- */
  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      setHasInteracted(true);

      const userMsg: ChatMessage = {
        id: generateId(),
        text: text.trim(),
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");

      // bot “typing” → then handoff message
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            text: t(
              "whatsapp.connecting",
              "Connecting you to our team on WhatsApp..."
            ),
            sender: "bot",
            timestamp: new Date(),
          },
        ]);

        // open WhatsApp in new tab after tiny delay
        setTimeout(() => {
          const msg = encodeURIComponent(text.trim());
          window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank", "noopener,noreferrer");
        }, 800);
      }, 1200);
    },
    [t]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  /* ---------------- quick-reply chips ---------------- */
  const handleQuickReply = (option: string) => {
    sendMessage(option);
  };

  /* -------------------- RENDER ----------------------- */
  return (
    <>
      {/* ---------- inline styles for keyframes ---------- */}
      <style>{`
        @keyframes wa-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>

      {/* ============================== CHAT PANEL ============================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: 88,
              [isRTL ? "left" : "right"]: 24,
              width: 360,
              maxWidth: "calc(100vw - 48px)",
              height: 520,
              maxHeight: "calc(100vh - 120px)",
              zIndex: 9998,
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
              overflow: "hidden",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            {/* ── Header ── */}
            <div
              style={{
                background: "#075E54",
                color: "#fff",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#128C7E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {AVATAR}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.3 }}>
                  {COMPANY_NAME}
                </div>
                <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.3 }}>
                  {t("whatsapp.status", "Typically replies in minutes")}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={t("whatsapp.close", "Close chat")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 22,
                  lineHeight: 1,
                  padding: 4,
                  opacity: 0.85,
                }}
              >
                ×
              </button>
            </div>

            {/* ── Messages ── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                background: "#E5DDD5",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "10px 14px",
                      borderRadius:
                        msg.sender === "user"
                          ? "16px 16px 4px 16px"
                          : "16px 16px 16px 4px",
                      background:
                        msg.sender === "user" ? "#DCF8C6" : "#fff",
                      color: "#111",
                      fontSize: 14,
                      lineHeight: 1.45,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.text}
                    <div
                      style={{
                        textAlign: "right",
                        fontSize: 10,
                        color: "#667781",
                        marginTop: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 4,
                      }}
                    >
                      <span>{formatTime(msg.timestamp)}</span>
                      {msg.sender === "user" && (
                        <svg
                          width="16"
                          height="11"
                          viewBox="0 0 16 11"
                          fill="none"
                        >
                          <path
                            d="M4.875 8.625L1.25 5M1.25 5l3.625-3.625M1.25 5h11.625"
                            stroke="#53BDEB"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Quick-reply chips inside bot message */}
                    {msg.options && msg.options.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                          marginTop: 10,
                        }}
                      >
                        {msg.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleQuickReply(opt)}
                            style={{
                              padding: "6px 12px",
                              borderRadius: 16,
                              border: "1px solid #25D366",
                              background: "#fff",
                              color: "#075E54",
                              fontSize: 13,
                              cursor: "pointer",
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div
                    style={{
                      padding: "10px 16px",
                      borderRadius: "16px 16px 16px 4px",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#999",
                        animation: "wa-pulse 1s infinite 0s",
                      }}
                    />
                    <span
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#999",
                        animation: "wa-pulse 1s infinite 0.2s",
                      }}
                    />
                    <span
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#999",
                        animation: "wa-pulse 1s infinite 0.4s",
                      }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Footer ── */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                background: "#F0F2F5",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("whatsapp.placeholder", "Type a message...")}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 20,
                  border: "none",
                  outline: "none",
                  fontSize: 14,
                  background: "#fff",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "none",
                  background: inputValue.trim() ? "#25D366" : "#ccc",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: inputValue.trim() ? "pointer" : "not-allowed",
                  flexShrink: 0,
                }}
                aria-label={t("whatsapp.send", "Send")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================== FLOATING BUTTON ============================== */}
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
        {/* Tooltip */}
        {!isOpen && !hasInteracted && (
          <span
            style={{
              background: "rgba(15,23,42,0.92)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              padding: "8px 12px",
              borderRadius: 9999,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              opacity: 1,
              transition: "opacity .2s ease",
            }}
          >
            {t("whatsapp.tooltip", "Chat with us on WhatsApp")}
          </span>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={t("whatsapp.tooltip", "Chat with us on WhatsApp")}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#25D366",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 18px rgba(37,211,102,0.45)",
            cursor: "pointer",
            transition: "transform .25s ease, filter .25s ease",
            animation: "wa-pulse 2s ease-in-out infinite",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.animation = "none";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.animation =
              "wa-pulse 2s ease-in-out infinite";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          {isOpen ? (
            /* X icon when open */
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            /* WhatsApp icon when closed */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.9c0 2.09.55 4.13 1.6 5.93L0 24l6.34-1.66a11.86 11.86 0 0 0 5.71 1.46h.01c6.56 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.44-8.42zM12.06 21.5h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.76.99 1-3.67-.23-.38a9.55 9.55 0 0 1-1.46-5.07c0-5.27 4.29-9.56 9.57-9.56 2.55 0 4.95 1 6.76 2.8a9.5 9.5 0 0 1 2.8 6.77c0 5.28-4.29 9.57-9.42 9.67zm5.26-7.16c-.29-.14-1.7-.84-1.97-.94-.26-.1-.46-.14-.65.14-.19.29-.74.94-.91 1.13-.17.19-.34.21-.62.07-.29-.14-1.21-.45-2.31-1.43-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.4 0 1.41 1.03 2.78 1.17 2.97.14.19 2.02 3.08 4.89 4.32.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.12-.26-.19-.55-.33z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
};
