const uniq = require("unique-string");


window.addEventListener('message', (event) => {
    const action = event.data;
    if(action.type === "ON_UPLOAD_BASE64_IMG" ) {
        addPic(action.payload);
    }
})

const _getBase64Info = (base64) => {
    const type = base64.split(";")[0].split(":")[1];
    const ext = type.split("/")[1];
    const name = uniq() + "." + ext;
    return {
      type,
      name,
    };
};


const addPic = (base64) => {
    const id = "i" + Math.floor(Math.random() * (new Date).getTime());
    const {type, name} = _getBase64Info(base64);
    fetch(base64).then(res => res.blob())
    .then(blob => {
       
        const file = new File([blob], name,{ type })
        const pic = new Pic(id);
        pic.setFileName(name);
        pic.setFile(file);
        pic.setQueueId(Object.keys(window.uploaderQueues)[0]);
        $.publish('addPicToQueue', [pic]);
        $.publish('addPicAndThrobbers',[pic])
        $.publish('addPics', [[pic], false])
    })

}
