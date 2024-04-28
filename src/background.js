chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'autofill') {
      chrome.runtime.sendMessage({ type: 'autofill', data: request.data }, function(response) {
        console.log('Autofill response:', response);
      });
    }
  });