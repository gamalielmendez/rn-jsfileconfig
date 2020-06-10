
const RNFS = require('react-native-fs');
import { PermissionsAndroid } from 'react-native'

export default class rn_jsfileconfig {

    constructor(opts={configName:'conf',defaults:{}}) {
        
        this.userDataPath = RNFS.ExternalStorageDirectoryPath  
        this.path = this.userDataPath+'/'+opts.configName+'.json'
        this.defaults=opts.defaults
        this.Error=null

    }

    async init(){ 

        const message1={
            title: 'Request Permission',message:'request write permission',
            buttonNegative: 'Cancel',buttonPositive: 'Ok',
        }

        const message2={
            title: 'Request Permission',message:'request reading permission',
            buttonNegative: 'Cancel',buttonPositive: 'Ok',
        }

        const Permission1=PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        const Permission2=PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE

        const res1 =await this.requestWriteAndReadDrivePermission(message1,Permission1)
        const res2 =await this.requestWriteAndReadDrivePermission(message2,Permission2)
        
        if(!res1||!res2){
            this.Error='error requesting permission'
            return false
        }

        this.data=await this.parseDataFile(this.path,this.defaults) 
        return true
    }

    async parseDataFile(filePath, defaults) {
        
        try {
            return JSON.parse( await RNFS.readFile(filePath))
        } catch(error) {
            this.Error=error.message
            return defaults 
        }
        
    }
 
    get(key) { return this.data[key] }

    async set(key,val) {
        
        this.data[key] = val;
        
        try {
            await RNFS.writeFile(this.path,JSON.stringify(this.data)) 
            return true
        } catch (error) {
            this.Error=error.message
            return false
        }
        
    }

    async requestWriteAndReadDrivePermission(messageData,requesConst){
        
        try {
            
            const granted = await PermissionsAndroid.request(requesConst,messageData) 
            return (granted === PermissionsAndroid.RESULTS.GRANTED)

        } catch (error) {
            this.Error=error.message
            return false     
        }

    }

}