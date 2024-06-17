const uniqueName = ()=>{
    const randStr = Math.random().toString(36).substring(2,6);
    const timeStamp = new Date().toISOString().replace(/[\/:]/g, '_');
    return `${randStr}_${timeStamp}`;
}

module.exports = uniqueName;