import React, { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { Card } from '@/components/ui/card';

const Chat: React.FC = () => {
  const [sessionId, setSessionId] = useState<string>(() => {
    // Generate a new session ID or retrieve from localStorage
    const stored = localStorage.getItem('rag-session-id');
    if (stored) return stored;
    
    const newId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('rag-session-id', newId);
    return newId;
  });

  const handleSessionChange = (newSessionId: string) => {
    setSessionId(newSessionId);
    localStorage.setItem('rag-session-id', newSessionId);
  };

  return (
    <div className="h-full p-4">
      <Card className="h-full bg-background/50 border-border/50 backdrop-blur-sm overflow-hidden shadow-lg">
        <ChatInterface 
          sessionId={sessionId} 
          onSessionChange={handleSessionChange}
        />
      </Card>
    </div>
  );
};

export default Chat;