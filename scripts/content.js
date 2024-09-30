//using the below text as the apis are paid and requires credit detail so for now using these text
const translations = {
  hi: {
    "hello": "नमस्ते",
    "Hello": "नमस्ते",
    "how are you?": "आप कैसे हैं?",
    "How are you?": "आप कैसे हैं?",
    "I am fine": "मैं ठीक हूँ",
    "i am fine": "मैं ठीक हूँ",
    "good morning": "सुप्रभात",
    "Good morning": "सुप्रभात",
    "good night": "शुभ रात्रि",
    "Good night": "शुभ रात्रि",
    "thank you": "धन्यवाद",
    "Thank you": "धन्यवाद",
    "please": "कृपया",
    "Please": "कृपया",
    "yes": "हाँ",
    "Yes": "हाँ",
    "no": "नहीं",
    "No": "नहीं",
    "what is your name?": "आपका नाम क्या है?",
    "What is your name?": "आपका नाम क्या है?",
    "my name is": "मेरा नाम है",
    "My name is": "मेरा नाम है",
    "nice to meet you": "आपसे मिलकर खुशी हुई",
    "Nice to meet you": "आपसे मिलकर खुशी हुई",
    "see you later": "फिर मिलेंगे",
    "See you later": "फिर मिलेंगे",
    "goodbye": "अलविदा",
    "Goodbye": "अलविदा",
    "where are you from?": "आप कहाँ से हैं?",
    "Where are you from?": "आप कहाँ से हैं?",
    "I love you": "मैं तुमसे प्यार करता हूँ",
    "i love you": "मैं तुमसे प्यार करता हूँ",
  },
  es: {
    "hello": "Hola",
    "Hello": "Hola",
    "how are you?": "¿Cómo estás?",
    "How are you?": "¿Cómo estás?",
    "I am fine": "Estoy bien",
    "i am fine": "Estoy bien",
    "good morning": "Buenos días",
    "Good morning": "Buenos días",
    "good night": "Buenas noches",
    "Good night": "Buenas noches",
    "thank you": "Gracias",
    "Thank you": "Gracias",
    "please": "Por favor",
    "Please": "Por favor",
    "yes": "Sí",
    "Yes": "Sí",
    "no": "No",
    "No": "No",
    "what is your name?": "¿Cuál es tu nombre?",
    "What is your name?": "¿Cuál es tu nombre?",
    "my name is": "Me llamo",
    "My name is": "Me llamo",
    "nice to meet you": "Mucho gusto",
    "Nice to meet you": "Mucho gusto",
    "see you later": "Hasta luego",
    "See you later": "Hasta luego",
    "goodbye": "Adiós",
    "Goodbye": "Adiós",
    "where are you from?": "¿De dónde eres?",
    "Where are you from?": "¿De dónde eres?",
    "I love you": "Te quiero",
    "i love you": "Te quiero",
  },
  fr: {
    "hello": "Bonjour",
    "Hello": "Bonjour",
    "how are you?": "Comment ça va?",
    "How are you?": "Comment ça va?",
    "I am fine": "Je vais bien",
    "i am fine": "Je vais bien",
    "good morning": "Bonjour",
    "Good morning": "Bonjour",
    "good night": "Bonne nuit",
    "Good night": "Bonne nuit",
    "thank you": "Merci",
    "Thank you": "Merci",
    "please": "S'il vous plaît",
    "Please": "S'il vous plaît",
    "yes": "Oui",
    "Yes": "Oui",
    "no": "Non",
    "No": "Non",
    "what is your name?": "Quel est votre nom?",
    "What is your name?": "Quel est votre nom?",
    "my name is": "Je m'appelle",
    "My name is": "Je m'appelle",
    "nice to meet you": "Enchanté",
    "Nice to meet you": "Enchanté",
    "see you later": "À plus tard",
    "See you later": "À plus tard",
    "goodbye": "Au revoir",
    "Goodbye": "Au revoir",
    "where are you from?": "D'où venez-vous?",
    "Where are you from?": "D'où venez-vous?",
    "I love you": "Je t'aime",
    "i love you": "Je t'aime",
  }
};


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translateChat') {
      const targetLanguage = request.targetLanguage;
      translateWhatsAppChat(targetLanguage)
          .then(() => sendResponse({ success: true }))
          .catch(error => {
              console.error('Translation error:', error);
              sendResponse({ success: false });
          });
      return true; // this indicates that we will send a response asynchronously
  }
});

async function translateWhatsAppChat(targetLanguage) {
  const messages = document.querySelectorAll('div.message-in, div.message-out');

  for (const message of messages) {
      const textElement = message.querySelector('span.selectable-text');
      if (textElement) {
          const originalText = textElement.innerText;
          const translatedText = translate(originalText, targetLanguage);

          let translationElement = message.querySelector('.translation');
          if (!translationElement) {
              translationElement = document.createElement('div');
              translationElement.className = 'translation';
              message.appendChild(translationElement);
          }
          translationElement.innerText = translatedText;
      }
  }
}

function translate(text, targetLanguage) {
  const languageDictionary = translations[targetLanguage];
  return languageDictionary[text] || text; // this will return the translated text 
}
