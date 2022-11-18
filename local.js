//document.cookie = "prenom=Pierre nom=Wesley task=coder; expires=fri, 18 Nov 2022 12:33:00 UTC; path=/"
// document.cookie = "prenom1=victor nom1=casablanca; expires=Sat, 19 Nov 2022 12:35:00 UTC; path=/"
// let arrayOfDay = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
// let c = document.cookie

// console.log(c);

class CookieManager{

    setCookies(key,value,available=1){
        if(this.getCookies(key) != ""){
            console.log("This Cookie Already Exists");
        }else{          
            if(available){
                let expireDate = new Date()
                expireDate.setTime(expireDate.getTime()+(available*24*60*60*1000))
                var deleteTime = "; expires="+expireDate.toGMTString()
            }
            document.cookie = `${key}=${value} ${deleteTime} ; path=/`
            console.log("Cookie Created");
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
                response = ""
        })

        return response
    }

    updateCookies(key,value,available=1){
        if(this.getCookies(key) != ""){ 
            let updateDate = new Date()
            updateDate.setTime(updateDate.getTime()+(available*24*60*60*1000))
            var deleteTime = "; expires="+updateDate.toGMTString()
            document.cookie = `${key}=${value} ${deleteTime} ; path=/`
            console.log("Cookie Update");
        }

    } 

    deleteCookies(key){
        document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
    }

} 

manager = new CookieManager()
manager.setCookies("gp2","cookie push",2)
console.log(manager.getCookies("gp2"))
manager.updateCookies("gp2","almost done",2)
console.log(manager.getCookies("gp2"))



