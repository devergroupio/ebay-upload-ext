const cheerio = require("cheerio");
const uniq = require("unique-string");
/**
 * Get Required information to make post request for uploading
 * @returns object
 */

const _getRequiredParams = async () => {
  const baseUrl = "https://www.picupload.ebay.ca/picupload/main";
  const html = await fetch(baseUrl).then((res) => res.text());
  const $ = cheerio.load(html);
  const uaek = $("input[name=uaek]").val();
  const aues = $("input[name=uaes]").val();
  const v = $("input[name=v]").val();
  const n = $("input[name=n]").val();
  const s = $("input[name=s]").val();
  const wm = $("input[name=wm]").val() || "";
  const url = $("#up-fileForm").attr("formaction");
  return [
    url,
    {
      uaek,
      aues,
      v,
      n,
      s,
      wm,
      aXRequest: 2, // always
    },
  ];
};

const _base642Binary = (base64) => {
  const type = base64.split(";")[0].split(":")[1];
  const ext = type.split("/")[1];
  const bin = window.atob(
    base64.replace(/\s/g, "").replace(/data:.*;base64,/, "")
  );
  const name = uniq() + "." + ext;
  return {
    type,
    bin,
    name,
  };
};

const _extractImageUrl = (returnPath) => {
  return {
    thumbnail: returnPath.replace(/\$\_[0-9]{1}/, "$_0"),
    preview: returnPath.replace(/\$\_[0-9]{1}/, "$_1"),
    original: returnPath.replace(/\$\_[0-9]{1}/, "$_57"),
  };
};

/**
 *
 * @param {string} base64 processing base64 and manupulate post request with xhr and custom form-data
 */

const uploadBase64 = async (base64) => {
  return new Promise(async (resolve, reject) => {
    const file = _base642Binary(base64);

    const [url, body] = await _getRequiredParams();

    XMLHttpRequest.prototype.sendAsBinary = function (b) {
      b = Array.prototype.map.call(b, function (b) {
        return b.charCodeAt(0) & 255;
      });
      b = new Uint8Array(b);
      this.send(b.buffer);
    };

    var xh = new XMLHttpRequest();

    xh.open("post", url, true);
    xh.onreadystatechange = function () {
      if (this.readyState != 4) {
        return;
      } else {
        if (this.status === 200) {
          resolve(_extractImageUrl(this.responseText.split(";")[1]));
        } else {
          reject(this.statusText);
        }
      }
    };

    const boundary = "ohaiimaboundary"; // custom boundary

    xh.setRequestHeader(
      "Content-Type",
      "multipart/form-data; boundary=" + boundary
    );

    xh.sendAsBinary(
      [
        '--ohaiimaboundary\r\nContent-Disposition: form-data; name="s"\r\n',
        body.s,
        '--ohaiimaboundary\r\nContent-Disposition: form-data; name="n"\r\n',
        body.n,
        '--ohaiimaboundary\r\nContent-Disposition: form-data; name="v"\r\n',
        body.v,
        '--ohaiimaboundary\r\nContent-Disposition: form-data; name="uaek"\r\n',
        body.uaek,
        '--ohaiimaboundary\r\nContent-Disposition: form-data; name="uaes"\r\n',
        body.aues,
        '--ohaiimaboundary\r\nContent-Disposition: form-data; name="aXRequest"\r\n',
        body.aXRequest,
        '--ohaiimaboundary\r\nContent-Disposition: form-data; name="wm"\r\n',
        body.wm,
        "--ohaiimaboundary",
        'Content-Disposition: form-data; name="Filedata"; filename="' +
          escape(file.name) +
          '"',
        "Content-Type:" + file.type,
        "",
        file.bin,
        "--ohaiimaboundary--",
      ].join("\r\n")
    );
  });
};

/**
 *
 * @param {File} file processing file and manupulate post request with xhr and custom form-data
 */

const uploadFile = async (file) => {
  return new Promise(async (resolve) => {
    const [url, body] = await _getRequiredParams();
    const r = new FileReader();
    r.onloadend = function (fl) {
      const file = fl.target.result;

      XMLHttpRequest.prototype.sendAsBinary = function (b) {
        b = Array.prototype.map.call(b, function (b) {
          return b.charCodeAt(0) & 255;
        });
        b = new Uint8Array(b);
        this.send(b.buffer);
      };

      var xh = new XMLHttpRequest();

      xh.open("post", url, true);
      xh.onreadystatechange = function () {
        if (this.readyState != 4) {
          return;
        } else {
          if (this.status === 200) {
            resolve(_extractImageUrl(this.responseText.split(";")[1]));
          } else {
            reject(this.statusText);
          }
        }
      };

      const boundary = "ohaiimaboundary"; // custom boundary

      xh.setRequestHeader(
        "Content-Type",
        "multipart/form-data; boundary=" + boundary
      );

      xh.sendAsBinary(
        [
          '--ohaiimaboundary\r\nContent-Disposition: form-data; name="s"\r\n',
          body.s,
          '--ohaiimaboundary\r\nContent-Disposition: form-data; name="n"\r\n',
          body.n,
          '--ohaiimaboundary\r\nContent-Disposition: form-data; name="v"\r\n',
          body.v,
          '--ohaiimaboundary\r\nContent-Disposition: form-data; name="uaek"\r\n',
          body.uaek,
          '--ohaiimaboundary\r\nContent-Disposition: form-data; name="uaes"\r\n',
          body.aues,
          '--ohaiimaboundary\r\nContent-Disposition: form-data; name="aXRequest"\r\n',
          body.aXRequest,
          '--ohaiimaboundary\r\nContent-Disposition: form-data; name="wm"\r\n',
          body.wm,
          "--ohaiimaboundary",
          'Content-Disposition: form-data; name="Filedata"; filename="' +
            escape(file.name) +
            '"',
          "Content-Type:" + file.type,
          "",
          file,
          "--ohaiimaboundary--",
        ].join("\r\n")
      );
    };
    r.readAsBinaryString(file);
  });
};

//expose api to browser

window.uploadFileToEbay = uploadFile;

window.uploadImageBase64ToEbay = uploadBase64;
