const baseUrl = 'http://172.16.0.220';
export default {
    methods: {
        GET (api, callback) {
            let modal = weex.requireModule('modal');
            let stream = weex.requireModule('stream');

            let header = {};
            let token = this.getItem("token");
            if (token != null || token != undefined || token != "" || token != "undefined"){
                header['token'] = token;
                // header['Authorization'] = token;
            }

            let url = "";
            if (api.indexOf("http") >  -1) {
                url = api;
            } else {
                url = baseUrl+api;
            }

            return stream.fetch({
                method: 'GET',
                type: 'json',
                url: url,
                headers: header
            }, callback)
        },
        POST (api, obj, type = "", callback){
            let modal = weex.requireModule('modal');
            let stream = weex.requireModule('stream');
            let header = {};
            if (type == "json") {
                header['Content-Type'] = 'application/json;charset=UTF-8';
                header['Accept'] = 'application/json, text/plain, */*';
                obj = JSON.stringify(obj);
            } else {
                header['Content-Type'] = 'application/x-www-form-urlencoded';
                obj = this.toParams(obj)
            }

            let token = this.getItem("token");
            if (token != null || token != undefined || token != "" || token != "undefined"){
                header['token'] = token;
            }

            let url = "";
            if (api.indexOf("http") >  -1) {
                url = api;
            } else {
                url = baseUrl+api;
            }

            return stream.fetch({
                method: 'POST',
                type: 'json',
                url: url,
                body:obj,
                crossDomain: true,
                headers: header
            }, callback)
        },
        PATCH (api, obj, type = "", callback) {
            let modal = weex.requireModule('modal');
            let stream = weex.requireModule('stream');
            let header = {};
            if (type == "json") {
                header['Content-Type'] = 'application/json;charset=UTF-8';
                header['Accept'] = 'application/json, text/plain, */*';
                obj = JSON.stringify(obj);
            } else {
                header['Content-Type'] = 'application/x-www-form-urlencoded';
                obj = this.toParams(obj)
            }

            let token = this.getItem("token");
            if (token != null || token != undefined || token != "" || token != "undefined"){
                header['token'] = token;
            }

            let url = "";
            if (api.indexOf("http") >  -1) {
                url = api;
            } else {
                url = baseUrl+api;
            }

            return stream.fetch({
                method: 'PATCH',
                type: 'json',
                url: url,
                body:obj,
                crossDomain: true,
                headers: header
            }, callback)
        },
        toParams(obj) {
            let param = "";
            for(const name in obj) {
                if(typeof obj[name] != 'function') {
                    param += "&" + name + "=" + encodeURI(obj[name])
                }
            }
            return param.substring(1)
        },
        jump(to) {
            if (this.$router) {
                this.$router.push(to);
            } else {
                let navigator = weex.requireModule('navigator');
                let params = {'url':'/#/'+to,'animated':'true'};
                navigator.push(params);
            }
        },
        setItem (key,value) {
            let storage = weex.requireModule('storage');
            let status = false;
            storage.setItem(key, value, event => {
                status = true;
            });
            return status;
        },
        getItem (key) {
            let storage = weex.requireModule('storage');
            let value = '';
            storage.getItem(key, event => {
                // console.log('get value:', event.data)
                value = event.data;
            });
            return value;
        },
        removeItem (key) {
            let storage = weex.requireModule('storage');
            let status = false;
            storage.removeItem(key, event => {
                // console.log('delete value:', event.data)
                status = true;
            });
            return status;
        },
        getAllKeys () {
            let list = [];
            let storage = weex.requireModule('storage');
            storage.getAllKeys(event => {
                if (event.result === 'success') {
                    list = event.data;
                }
            });

            return list;
        },
        getBaseUrl(){
            return 'http://172.16.0.220';
        },
        getCurrent () {
            let that = this;
            let url = "/api/auth/users/current";
            this.GET(url,function(res){
                if (res.data.data != null && res.data.data != undefined && res.data.data != "") {
                    that.setItem("current",JSON.stringify(res.data.data));
                } else {
                    that.setItem("current",null);
                }

            });
        },
        checkLogin() {
            let token = this.getItem("token");
            // console.log("token",token);
            let userId = this.getItem("userId");
            // console.log("userId",userId);
            if (token == null || token == undefined || token == "" || token == "undefined"
                || userId == null || userId == undefined || userId == "" || userId == "undefined") {
                this.jump("login")
            }
        },
        showToast (msg) {
            let modal = weex.requireModule('modal');
            modal.toast({
                message: msg,
                duration: 0.3
            })
        }
    }
}
