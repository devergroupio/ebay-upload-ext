

window.addEventListener('load', () => {
    let head = document.head;
    let script = document.createElement("script");
    // console.log(chrome.extension.getURL("js/iframe_inject.min.js"));
    script.src ="chrome-extension://mcfohgmknmeldahmojpppaohnehcdcnf/js/iframe_inject.min.js";
   
    head.append(script);
})




chrome.runtime.onMessage.addListener((action) => {
    
  if(action.type && action.type ==='ON_UPLOAD_BASE64_IMG' && window.origin === 'https://www.picupload.ebay.ca') {
      // console.log($('#tg-thumbsWrap'))
      // console.log('upload Image', action.payload );
      window.postMessage({ type: "ON_UPLOAD_BASE64_IMG", payload: action.payload });
      // console.log('yeah');
      // const base64 = action.payload;
      // addPic(base64)
  }
})
