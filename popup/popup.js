document.addEventListener('DOMContentLoaded', function() {
  const translateButton = document.getElementById('translateChat');
  const targetLanguageSelect = document.getElementById('targetLanguage');
  const statusDiv = document.getElementById('status');

  translateButton.addEventListener('click', function() {
      const targetLanguage = targetLanguageSelect.value;

      // this is to send a message to the content script just to show the message of succesfull or not
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'translateChat', targetLanguage: targetLanguage }, function(response) {
              if (response && response.success) {
                  statusDiv.textContent = 'Translation completed!';
              } else {
                  statusDiv.textContent = 'Translation failed. Please try again.';
              }
          });
      });
  });
});
