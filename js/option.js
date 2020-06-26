window.addEventListener("load", () => {
  document.getElementById("upload_file").addEventListener("click", () => {
    const file = document.getElementById("file");
    window.uploadFileToEbay(file.files[0]).then((res) => {
      console.log(JSON.stringify(res));
      const result = document.getElementById("result");
      result.value = JSON.stringify(res);
    });
  });

  document.getElementById("upload_base64").addEventListener("click", () => {
    const textarea = document.getElementById("textarea");
    window.uploadImageBase64ToEbay(textarea.value).then((res) => {
      console.log(JSON.stringify(res));
      const result = document.getElementById("result");
      result.value = JSON.stringify(res);
    });
  });
});
