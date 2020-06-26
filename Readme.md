# Steps by steps

```
npm install

npm run build

Load the extension into chrome

Open options page and inspect to test

```

# Some Notes:

- I export a file named: utils.min.js ( production) or you can custom in folder (src/utils/index.js)
- Some block code is copied from ebay minified JS then if you need more detail please inspect ebay and check by yourself
- The utils.min.js only can run in background.js, option.js, popup.js but not for content.js
- everything need for simulating the uploading is bundled insite the utils.min.js then you can copy to your extension without write any code block
- check the file src/options.html to know how to use it
