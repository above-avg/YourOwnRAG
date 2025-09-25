import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Bot, User, Loader2, Sparkles, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/ai-hero.jpg';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  sessionId: string;
  onSessionChange: (sessionId: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ sessionId, onSessionChange }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash-lite');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Using demo API service for now
      const { apiService } = await import('@/lib/api');
      const data = await apiService.chat({
        question: input,
        session_id: sessionId,
        model: selectedModel as 'gemini-2.5-flash-lite' | 'gemini-2.5-flash',
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      if (data.session_id && data.session_id !== sessionId) {
        onSessionChange(data.session_id);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-background/50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            AI Assistant
          </h2>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite</SelectItem>
              <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in py-12">
            {/* Welcome Content */}
            <div className="space-y-6 mb-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome to RAG AI Assistant
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Your intelligent document companion. Upload files and ask questions to get contextual, 
                accurate answers powered by advanced retrieval and generation technology.
              </p>
            </div>

            {/* Quick Start */}
            <div className="bg-muted/50 rounded-lg p-6 border border-border/50">
              <h3 className="text-lg font-semibold mb-3">Ready to get started?</h3>
              <p className="text-muted-foreground mb-4">
                Begin by uploading documents or simply start a conversation below.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <button 
                  onClick={() => setInput("Summarize the main points")}
                  className="px-3 py-1 bg-background rounded-full border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  "Summarize the main points"
                </button>
                <button 
                  onClick={() => setInput("What is this document about?")}
                  className="px-3 py-1 bg-background rounded-full border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  "What is this document about?"
                </button>
                <button 
                  onClick={() => setInput("Find information on...")}
                  className="px-3 py-1 bg-background rounded-full border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  "Find information on..."
                </button>
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 animate-slide-up",
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            
            <Card className={cn(
              "max-w-[80%] p-4 border border-border/50",
              message.role === 'user' 
                ? "bg-primary/10 ml-auto" 
                : "bg-muted/50"
            )}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs text-muted-foreground mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </Card>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3 animate-slide-up">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <Card className="p-4 bg-muted/50 border border-border/50">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-background/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your documents..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};