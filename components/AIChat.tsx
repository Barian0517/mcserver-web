import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, ChevronDown, Cherry } from 'lucide-react';
import { ChatMessage, MessageRole } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: MessageRole.MODEL,
      text: "🌸 歡迎來到幽影櫻的領域！我是這裡的 AI 嚮導。想知道伺服器 IP、模組安裝方式還是世界介紹？儘管問我吧！✨",
      timestamp: Date.now()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: modelMessageId,
      role: MessageRole.MODEL,
      text: '', 
      timestamp: Date.now()
    }]);

    try {
      const stream = await sendMessageToGemini(userMessage.text);
      
      if (stream) {
        let fullText = '';
        for await (const chunk of stream) {
          fullText += chunk;
          setMessages(prev => prev.map(msg => 
            msg.id === modelMessageId ? { ...msg, text: fullText } : msg
          ));
        }
      }
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId ? { ...msg, text: "⚠️ 靈力連結中斷，請稍後再試。" } : msg
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-void-card border border-sakura/50 shadow-[0_0_20px_rgba(255,183,197,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-sakura group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Cherry className="text-sakura group-hover:text-void-bg w-7 h-7 transition-colors" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
      </button>

      {/* Chat Interface */}
      <div className={`fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[380px] h-[550px] bg-void-bg/90 backdrop-blur-xl border border-sakura/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none translate-y-10'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-void-card to-void-bg border-b border-white/10 p-4 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-sakura/5"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-sakura/10 p-2 rounded-lg border border-sakura/20">
              <Bot className="text-sakura w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm tracking-wide">幽影櫻 AI 助手</h3>
              <p className="text-sakura/70 text-[10px] flex items-center gap-1 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded relative z-10"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-sakura/20 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                msg.role === MessageRole.USER 
                  ? 'bg-sakura text-void-bg font-medium rounded-br-none' 
                  : 'bg-void-card border border-white/10 text-gray-200 rounded-bl-none'
              }`}>
                {msg.role === MessageRole.MODEL ? (
                  <ReactMarkdown components={{
                     p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                     strong: ({node, ...props}) => <span className="font-bold text-sakura" {...props} />,
                     ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                     li: ({node, ...props}) => <li className="" {...props} />,
                     code: ({node, ...props}) => <code className="bg-black/30 px-1 py-0.5 rounded text-xs font-mono text-sakura" {...props} />,
                  }}>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-void-card border border-white/10 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-sakura rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-sakura rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-sakura rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-void-bg/50 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="詢問指令或世界資訊..."
                disabled={isTyping}
                className="w-full bg-void-card text-white rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-1 focus:ring-sakura/50 border border-white/10 transition-all placeholder:text-gray-600 text-sm"
              />
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 text-sakura w-4 h-4 opacity-50 animate-pulse" />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-3 rounded-xl bg-sakura hover:bg-sakura-dark disabled:opacity-50 disabled:cursor-not-allowed text-void-bg transition-colors shadow-[0_0_10px_rgba(255,183,197,0.3)]"
            >
              <Send size={18} className="fill-current" />
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default AIChat;