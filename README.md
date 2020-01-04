# rn_jsfileconfig
### biblioteca para generar archivos de configuracion en formato json

# Para Instalar
```javascript 
npm i rn_jsfileconfig
//o
yarn add rn_jsfileconfig
````
# Como se Usa
```javascript 
import rn_jsfileconfig from 'rn_jsfileconfig'

const Config = new rn_jsfileconfig({ configName: 'Conf',defaults: { HOST: "" }})
await Config.init()
await Config.set("HOST", 'https://github.com/gamalielmendez/rn-jsfileconfig')
console.log(Config.get('HOST')) //result https://github.com/gamalielmendez/rn-jsfileconfig

```` 

