import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-markdown";
import { MessageCircle, X, Send, AlertTriangle } from "lucide-react";

const BETA_VERSION = "1.0.0-beta";
const API_RATE_LIMIT = 20; // messages per minute

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "👋 Welcome to Bike Becho AI Assistant (Beta)!\n\n" +
            "I can help you with:\n" +
            "• Finding bikes within your budget\n" +
            "• Understanding bike specifications\n" +
            "• Price predictions and market trends\n" +
            "• Tips for buying/selling used bikes\n" +
            "• Platform features and navigation\n\n" +
            "_Note: This is a beta version. Responses may not always be accurate._\n\n" +
            "How can I assist you today?",
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generatePrompt = (userMessage) => {
    return `
      You are an AI assistant for Bike Becho, a platform for buying and selling second-hand bikes in India.
      
      Context about Bike Becho:
      - Platform features: Bike listings, AI price predictions, direct messaging, image uploads
      - Services: Buy and sell second-hand bikes, rent bikes
      - Key features: User authentication, secure payments, rating system
      
      User Question: ${userMessage}
      
      Provide a helpful, concise response focusing on:
      1. Accurate information about bikes and the platform
      2. Practical advice for buyers and sellers
      3. Relevant platform features that could help the user
      4. Market insights when applicable
      
      Response format: Use markdown for better readability. Keep responses under 150 words.
    `;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInputMessage("");

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generatePrompt(inputMessage);
      const result = await model.generateContent(prompt);

      const botMessage = { text: result.response.text(), isBot: true };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting. Please try again or contact support.",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-50 flex items-center gap-2"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
          <span className="hidden md:inline">Need Help?</span>
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs px-2 py-1 rounded-full">
            BETA
          </span>
        </button>
      )}

      <div className={`fixed bottom-0 right-0 w-full md:w-[400px] transition-all duration-300 z-50 
                ${isChatOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
        <div className="m-4 bg-white rounded-lg shadow-2xl flex flex-col max-h-[600px]">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle size={24} />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">Bike Becho Assistant</h2>
                  <span className="bg-yellow-400 text-blue-900 text-xs px-2 py-1 rounded-full">
                    v{BETA_VERSION}
                  </span>
                </div>
                <p className="text-sm text-blue-100">AI Powered Support (Beta)</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-blue-700 p-2 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                    message.isBot
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  <Markdown className="prose prose-sm">{message.text}</Markdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about bikes, prices, or features..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Send size={20} />
                <span className="hidden md:inline">Send</span>
              </button>
            </div>
          </form>
          <div className="p-2 bg-yellow-50 border-t border-yellow-100 text-xs text-yellow-700 flex items-center gap-1">
            <AlertTriangle size={12} />
            <span>Beta version: Responses may not always be accurate</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;