const getActiveTab = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          return resolve(tabs[0]);
        } else reject("Please open popup when open ebay.ca page");
      }
    );
  });
};

window.addEventListener("load", () => {
  document.getElementById("test-btn").addEventListener("click", () => {
    console.log("on click");
    console.log("sendMessage");
  
    const img = document.getElementById("img-base64");
    getActiveTab().then((tab) => {
        console.log("found tabs", tab);
        chrome.tabs.sendMessage(tab.id, {
          type: "ON_UPLOAD_BASE64_IMG",
          payload: img.value,
        });
      });
  });
});

