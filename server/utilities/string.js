class String {
    static characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';

    generate(length){
        let result = '';
        for(var x = 0; x < length; x++){
            result += String.characters.charAt(Math.floor(Math.random() * String.characters.length));
        }
        return result;
    }
}

module.exports = new String();