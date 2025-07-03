import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Bot, Send, MessageCircle, Zap, AlertCircle, Settings, Activity } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  message: string;
  timestamp: string;
  context?: string;
}

interface PersonalizedAIAssistantProps {
  botId: string;
  botName: string;
  botStatus: string;
  botHealth: number;
}

export const PersonalizedAIAssistant: React.FC<PersonalizedAIAssistantProps> = ({
  botId,
  botName,
  botStatus,
  botHealth
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<'general' | 'error' | 'setup' | 'logs'>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history on component mount
  useEffect(() => {
    loadChatHistory();
  }, [botId]);

  const loadChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_chat_history')
        .select('role, message, timestamp, context')
        .eq('bot_id', botId)
        .eq('user_id', user?.id)
        .order('timestamp', { ascending: true })
        .limit(50);

      if (error) throw error;
      setMessages((data || []) as ChatMessage[]);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to UI immediately
    const newUserMessage: ChatMessage = {
      role: 'user',
      message: userMessage,
      timestamp: new Date().toISOString(),
      context
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const { data, error } = await supabase.functions.invoke('personalized-ai-assistant', {
        body: {
          botId,
          userId: user?.id,
          message: userMessage,
          context
        }
      });

      if (error) throw error;

      if (data.success) {
        // Add AI response to UI
        const aiMessage: ChatMessage = {
          role: 'assistant',
          message: data.response,
          timestamp: new Date().toISOString(),
          context
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('AI assistant temporarily unavailable');
      }
    } catch (error) {
      toast({
        title: "AI Assistant Error",
        description: "Failed to get response from AI assistant. Please try again.",
        variant: "destructive",
      });
      
      // Remove the user message if AI failed
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getContextIcon = (contextType: string) => {
    switch (contextType) {
      case 'error': return <AlertCircle className="h-3 w-3" />;
      case 'setup': return <Settings className="h-3 w-3" />;
      case 'logs': return <Activity className="h-3 w-3" />;
      default: return <MessageCircle className="h-3 w-3" />;
    }
  };

  const getContextColor = (contextType: string) => {
    switch (contextType) {
      case 'error': return 'destructive';
      case 'setup': return 'secondary';
      case 'logs': return 'outline';
      default: return 'default';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getQuickActions = () => [
    { text: "मेरा bot क्यों नहीं चल रहा?", context: 'error' },
    { text: "Bot के logs कैसे देखूं?", context: 'logs' },
    { text: "नया command कैसे add करूं?", context: 'setup' },
    { text: "Bot की health कैसे improve करूं?", context: 'general' }
  ];

  return (
    <Card className="bg-card shadow-sm border h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-base font-semibold text-card-foreground">
                AI Assistant - {botName}
              </CardTitle>
              <CardDescription className="text-sm">
                आपके bot के लिए personalized help
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={botStatus === 'running' ? 'default' : 'destructive'}>
              {botStatus}
            </Badge>
            <Badge variant={botHealth > 80 ? 'default' : 'destructive'}>
              {botHealth}% Health
            </Badge>
          </div>
        </div>
        
        {/* Context Selection */}
        <div className="flex gap-2 mt-3">
          {(['general', 'error', 'setup', 'logs'] as const).map((ctx) => (
            <Button
              key={ctx}
              variant={context === ctx ? 'default' : 'outline'}
              size="sm"
              onClick={() => setContext(ctx)}
              className="flex items-center gap-1 text-xs"
            >
              {getContextIcon(ctx)}
              {ctx.charAt(0).toUpperCase() + ctx.slice(1)}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">
                  नमस्ते! मैं आपके <strong>{botName}</strong> bot का AI assistant हूं।<br/>
                  आप मुझसे कुछ भी पूछ सकते हैं!
                </p>
                
                {/* Quick Action Buttons */}
                <div className="grid grid-cols-1 gap-2 mt-4 max-w-md mx-auto">
                  {getQuickActions().map((action, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setContext(action.context as any);
                        setInputMessage(action.text);
                      }}
                      className="text-left justify-start text-xs"
                    >
                      {action.text}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.context && (
                        <Badge 
                          variant={getContextColor(msg.context) as any}
                          className="text-xs h-4"
                        >
                          {getContextIcon(msg.context)}
                          {msg.context}
                        </Badge>
                      )}
                      <span className="text-xs opacity-70">
                        {formatTimestamp(msg.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin">
                      <Zap className="h-3 w-3" />
                    </div>
                    <span className="text-sm">AI सोच रहा है...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`${botName} के बारे में कुछ पूछें...`}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            यह AI assistant सिर्फ आपके bot के data का use करके reply देता है
          </p>
        </div>
      </CardContent>
    </Card>
  );
};