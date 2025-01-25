import crypto from 'node:crypto';
// const secretKey = process.env.ENCRYPTION_KEY;
// const encryptionAlgo = 'aes-256-cbc';

export const encryptString = async (strToEncrypt, secretKey) => {

    // console.log('init encryptString method');
    // console.log('encryptionKey: ' + process.env.ENCRYPTION_KEY);

    //const secretKey = process.env.ENCRYPTION_KEY;
    const encryptionAlgo = 'aes-256-cbc';

    try {

        const iv = crypto.randomBytes(16);

        const encryptionObj = {
            iv: iv.toString('hex'),
            encryptedStr: null
        }

        let cypher = crypto.createCipheriv(encryptionAlgo, secretKey, iv);
        encryptionObj.encryptedStr = cypher.update(strToEncrypt, 'utf-8', 'hex');
        encryptionObj.encryptedStr += cypher.final('hex');

        // this.decryptString(encryptionObj);

        return encryptionObj;

    } catch (err) {

        console.error(err);
        return false;

    }


}

export const decryptString = async (encryptionObj, secretKey) => {
    
    // console.log('init decryptString method');

    //const secretKey = process.env.ENCRYPTION_KEY;
    const encryptionAlgo = 'aes-256-cbc';

    // console.log(encryptionObj);

    let iv = Buffer.from(encryptionObj.iv, 'hex');

    try {

        let decipher = crypto.createDecipheriv(encryptionAlgo, secretKey, iv);
        let decrypted = decipher.update(encryptionObj.encryptedStr, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;

    } catch (err) {
            
        console.error(err);
        return false;
            
    }

}
