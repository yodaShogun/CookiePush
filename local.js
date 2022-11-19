class ParameterError extends Error {

    constructor(message) {
        super(message);

        this.name = 'Parameter_Error';
    }
}
class CookieError extends Error {

    constructor(message) {

        super(message);
        this.name = 'Cookie_Error';
    }
}

class KeyError extends Error {

    constructor(message) {
        super(message);

        this.name = 'key_Error';
    }
}
class ValueError extends Error {
    constructor(message) {
        super(message);

        this.name = 'Value_Error';
    }
}
class TypeError extends Error {
    constructor(message) {
        super(message);

        this.name = 'Type_Error';
    }


}
class CookieManager{
    
    message = ""

    setCookies(key,value,available=1){

        if(this.getCookies(key) != ""){
            throw new CookieError("Cookie Already Exits")
        }else{
            if(typeof(key)!="string" || key.includes(';')){
                throw new TypeError("Invalid Key")           
            }else{
                if(value=="" || value.includes(';')){     
                    throw new ValueError("Invalid Character Or Null Value Detected")
                }else{
                    let expireDate = new Date()
                    if(parseInt(available)){    
                        expireDate.setTime(expireDate.getTime()+(available*24*60*60*1000))
                        var deleteTime = "; expires="+expireDate.toGMTString()
                        typeof(value)=="object"? document.cookie = `${key}=${JSON.stringify(value)} ${deleteTime} ; path=/` : document.cookie = `${key}=${value} ${deleteTime} ; path=/`
                        return this.message = "A Cookies Has Been Created Successfully"
                    }else
                        throw new TypeError("Invalid Expires Date")
                }
            }
        }
    } 

    getCookies(key){
        const decodeCookie = decodeURIComponent(document.cookie)
        const cookieArray = decodeCookie.split('; ')
        let response = null

        cookieArray.forEach(element=>{
            if(element.indexOf(key)==0){
                response = element.substring(key.length+1)
            }else
                response=''
        })

        return response 
    }

    updateCookies(key,value,available=1){
        if(this.getCookies(key)){ 
            let updateDate = new Date()
            updateDate.setTime(updateDate.getTime()+(available*24*60*60*1000))
            var deleteTime = "; expires="+updateDate.toGMTString()

            typeof(value)=="object"? document.cookie = `${key}=${JSON.stringify(value)} ${deleteTime} ; path=/` : document.cookie = `${key}=${value} ${deleteTime} ; path=/`
            console.log("Cookies Updated");
        }else
            throw new KeyError("Key Not Found") 
    } 

    deleteCookies(key){
        if(this.getCookies(key))
            document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
        else
            throw new KeyError("Key Not Found")
    }
} 

manager = new CookieManager()
//console.log(manager.setCookies('code8',"ufjvfjvfvlm",'kiop'))
//manager.deleteCookies()



