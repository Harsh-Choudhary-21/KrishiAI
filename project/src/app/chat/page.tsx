'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMessageCircle } from 'react-icons/fi'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import toast from 'react-hot-toast'

type Message = {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

type Language = 'en' | 'hi'

// Predefined responses in English and Hindi
const PREDEFINED_RESPONSES: Record<string, Record<Language, string>> = {
  'Best fertilizer for wheat?': {
    en: 'For wheat cultivation, a balanced NPK fertilizer (like 20-20-20) is recommended during land preparation. Apply nitrogen-rich fertilizer like urea (46-0-0) during the tillering stage. For optimal results, incorporate organic matter and use soil testing to determine specific needs for your field.',
    hi: 'गेहूं की खेती के लिए, भूमि तैयारी के दौरान संतुलित NPK उर्वरक (जैसे 20-20-20) की सिफारिश की जाती है। टिलरिंग चरण के दौरान यूरिया (46-0-0) जैसे नाइट्रोजन युक्त उर्वरक का प्रयोग करें। सर्वोत्तम परिणामों के लिए, जैविक पदार्थ मिलाएं और अपने खेत की विशिष्ट आवश्यकताओं को निर्धारित करने के लिए मिट्टी परीक्षण का उपयोग करें।'
  },
  'How to treat stem borer?': {
    en: 'To control stem borers in crops: 1) Use pheromone traps to monitor pest populations. 2) Apply neem-based insecticides as they are eco-friendly. 3) For severe infestations, consider systemic insecticides like Chlorantraniliprole or Flubendiamide. 4) Practice crop rotation and maintain field hygiene by removing crop residues after harvesting.',
    hi: 'फसलों में तना छेदक को नियंत्रित करने के लिए: 1) कीट आबादी की निगरानी के लिए फेरोमोन ट्रैप का उपयोग करें। 2) नीम-आधारित कीटनाशकों का प्रयोग करें क्योंकि वे पर्यावरण के अनुकूल हैं। 3) गंभीर संक्रमण के लिए, क्लोरांट्रानिलिप्रोल या फ्लुबेंडिअमाइड जैसे प्रणालीगत कीटनाशकों पर विचार करें। 4) फसल चक्र का अभ्यास करें और फसल कटाई के बाद फसल अवशेषों को हटाकर खेत की स्वच्छता बनाए रखें।'
  },
  'Subsidy for polyhouse?': {
    en: 'The Government of India offers subsidies for polyhouse construction under the National Horticulture Mission. Small and marginal farmers can receive up to 50% subsidy, while other farmers get up to 40%. The maximum subsidy is capped at ₹32,000 per 500 sq.m. Apply through your district horticulture office with land documents, bank statements, and a detailed project report.',
    hi: 'भारत सरकार राष्ट्रीय बागवानी मिशन के तहत पॉलीहाउस निर्माण के लिए सब्सिडी प्रदान करती है। छोटे और सीमांत किसानों को 50% तक सब्सिडी मिल सकती है, जबकि अन्य किसानों को 40% तक मिलती है। अधिकतम सब्सिडी 500 वर्ग मीटर प्रति ₹32,000 तक सीमित है। भूमि दस्तावेजों, बैंक स्टेटमेंट और विस्तृत परियोजना रिपोर्ट के साथ अपने जिला बागवानी कार्यालय के माध्यम से आवेदन करें।'
  }
}

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9)

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      content: 'Hello! I am KrishiMitra AI, your agricultural assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState<Language>('en')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    
    try {
      // Check for predefined responses
      let response: string | null = null
      
      // Check if the input matches or contains any of the predefined questions
      for (const [question, responses] of Object.entries(PREDEFINED_RESPONSES)) {
        if (input.toLowerCase().includes(question.toLowerCase())) {
          response = responses[language]
          break
        }
      }
      
      // If no match, use a generic response
      if (!response) {
        if (language === 'en') {
          response = "I don't have specific information about that query yet. Please ask about wheat fertilizers, stem borer treatment, or polyhouse subsidies for detailed answers."
        } else {
          response = "मुझे अभी तक इस प्रश्न के बारे में विशिष्ट जानकारी नहीं है। कृपया विस्तृत उत्तरों के लिए गेहूं के उर्वरकों, तना छेदक उपचार, या पॉलीहाउस सब्सिडी के बारे में पूछें।"
        }
      }
      
      // Simulate API delay
      setTimeout(() => {
        const botMessage: Message = {
          id: generateId(),
          content: response || '',
          sender: 'bot',
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 1000)
      
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again.')
      setIsTyping(false)
    }
  }
  
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    
    // Update bot greeting message when language changes
    setMessages(prev => {
      const updatedMessages = [...prev]
      
      // Find the first bot message (greeting) and update it
      const greetingIndex = updatedMessages.findIndex(msg => msg.sender === 'bot')
      if (greetingIndex !== -1) {
        updatedMessages[greetingIndex] = {
          ...updatedMessages[greetingIndex],
          content: newLanguage === 'en' 
            ? 'Hello! I am KrishiMitra AI, your agricultural assistant. How can I help you today?'
            : 'नमस्ते! मैं कृषिमित्र AI हूँ, आपका कृषि सहायक। आज मैं आपकी कैसे मदद कर सकता हूँ?'
        }
      }
      
      return updatedMessages
    })
  }

  return (
    <div className="container-custom max-w-4xl py-8">
      <div className="card flex flex-col h-[80vh]">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
              <FiMessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="ml-3 text-xl font-semibold">KrishiMitra Chat</h1>
          </div>
          <LanguageToggle onChange={handleLanguageChange} />
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className={`chat-bubble ${
                    message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                  }`}
                >
                  <p className="text-sm md:text-base">{message.content}</p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="chat-bubble chat-bubble-bot">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={language === 'en' ? "Type your question..." : "अपना प्रश्न लिखें..."}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FiSend className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {language === 'en' 
              ? "Try asking about: Best fertilizer for wheat? How to treat stem borer? Subsidy for polyhouse?"
              : "इनके बारे में पूछने का प्रयास करें: गेहूं के लिए सबसे अच्छा उर्वरक? तना छेदक का इलाज कैसे करें? पॉलीहाउस के लिए सब्सिडी?"}
          </div>
        </div>
      </div>
    </div>
  )
}