module.exports = (inputs, required) => {
    return new Promise((resolve, reject) => {
        let notPresent = [];
        required.forEach(field => {
            if(!inputs[field]){
                notPresent.push("'" + field + "'" + ' field is required');
            }
        });
        if(notPresent.length > 0){
            reject({'required': notPresent});
        } else { resolve(); }
    });
}