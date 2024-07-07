export {}
 
//server work: 整个扩展插件的后台工作
const uniqueKey = `configuredUrl_${chrome.runtime.id}`;

chrome.tabs.onCreated.addListener(function(tab) {
    if (!(tab.url === "edge://newtab/" || tab.pendingUrl === "edge://newtab/")) return; 
    
    chrome.storage.local.get(uniqueKey, function(result) {
        if (result[uniqueKey]) {
          chrome.tabs.update(tab.id, { url: result[uniqueKey]});
        }
    })
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.redirectUrl){
    chrome.storage.local.set({[uniqueKey]: request.redirectUrl})
  }
	sendResponse({res: 'ok'});
});