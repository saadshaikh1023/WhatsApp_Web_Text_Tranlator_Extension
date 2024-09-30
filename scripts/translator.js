const TRANSLATOR_API_ENDPOINT = 'https://translate.argosopentech.com/translate';
const DETECT_API_ENDPOINT = 'https://translate.argosopentech.com/detect';
const LANGUAGES_API_ENDPOINT = 'https://translate.argosopentech.com/languages';

async function translateText(text, targetLanguage) {
    try {
        const response = await fetch(TRANSLATOR_API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                q: text,
                source: 'auto',
                target: targetLanguage,
                format: 'text',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
}

async function detectLanguage(text) {
    try {
        const response = await fetch(DETECT_API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({ q: text }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.language;
    } catch (error) {
        console.error('Language detection error:', error);
        throw error;
    }
}

async function getSupportedLanguages() {
    try {
        const response = await fetch(LANGUAGES_API_ENDPOINT);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching supported languages:', error);
        throw error;
    }
}

export { translateText, detectLanguage, getSupportedLanguages };
