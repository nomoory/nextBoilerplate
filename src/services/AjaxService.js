import axios from "axios";
import {SERVER_BASE_URI} from "constants";

class AjaxService {
    constructor(){
        this.testUri = SERVER_BASE_URI;
    }

    connect(user) {
        let uri = this.testUri + "/connect"
        if(user) uri = uri + "?user=" + user;
        let userName = axios.get(uri)
        .then((res) => {
            return res.data.user;
        })
        .catch(catchCallback);
        return userName;
    }

    getUserList() {
        let uri = this.testUri + "/user_list";
        let userList = axios.get(uri)
        .then((res) => {
            let userList = res.data;
            console.log("success to get user list :" + userList);
            return userList
        })
        .catch(catchCallback);
        return userList
    }

    getConnectionState(id) {
        let uri = this.testUri + "/connection_state/?id=" + id;
        let connectionState = axios.get(uri)
        .then((res) => {
            let connectionState = res.data;
            console.log("success to get connection state :" + connectionState);
            return connectionState
        })
        .catch(catchCallback);
        return connectionState
    }

    getDatawithId(id) {
        id = id || "root";
        let uri = this.testUri + "/data/?id=" + id;
        let jsonString = axios.get(uri)
        .then((res) => {
            let jsonString = res.data;
            console.log("success to get jsonData :" + jsonString);
            return jsonString
        })
        .catch(catchCallback);
        return jsonString
    }

    getPatternList(id) {
        id = id || "root";
        let uri = this.testUri + '/pattern_list/' + id;
        let jsonString = axios.get(uri)
        .then((res) => {
            let jsonString = res.data;
            console.log("success to get jsonData :" + jsonString);
            return jsonString
        })
        .catch(catchCallback);
        return jsonString
    }

    getYaml(params) { // params : {user, name, extension,variant,language, appName,}
        return getResponse("get", "/patterns/", params)
    }

    updateYaml(params) {// params : {user, name, extension,variant,language, appName,}
        let {content, ...filteredParams} = params;
        let data = { content };
        return getResponse("post", "/patterns/", filteredParams, data)
    }

    getEntity(params) {
        return getResponse("get", "/entities/", params)
    }

    updateEntity(params) {
        let {content, ...filteredParams} = params;
        let data = { content };

        return getResponse("post", "/entities/", filteredParams, data);
    }

    activateClick(id) {
        if (!id) return null
        let uri = this.testUri + '/click/' + id;
        let response = axios.get(uri)
        .then((res) => {
            let response = res.data;
            console.log("success to get response :" + response);
            return response
        })
        .catch(catchCallback);
        return response
    }

    getViewTree() {
        let uri = this.testUri + "/viewTree";
        let viewTree = axios.get(uri)
        .then((res) => {
            let viewTree = res.data[0];
            console.log("success to get view tree :" + viewTree);
            return viewTree
        })
        .catch(catchCallback);
        return viewTree
    }

    getContext(){
        let uri = this.testUri + "/contexts";
        let context = axios.get(uri)
        .then((res) => {
            let context = res.data;
            console.log("success to get context :" + context);
            return context
        })
        .catch(catchCallback);
        return context
    }

    getDirectory(user, type){
        let params = {user, type};
        return getResponse("get", "/directories", params)
    }

    orderSpeechCommand(user, text) {
        let uri = this.testUri + "/speech_command";
        let params = {
            url: uri,
            type: "POST",
            data: JSON.stringify({text}), //Stringified Json Object
        };
        let result = axios.post(uri,"text=" + text )//+ "&user=" + user)
        .then((res) => {
            let result = res.data;
            console.log("success to order speech command :" + result);
            return result
        })
        .catch((error) => {
           let result = { text: text, status: "error" };
           catchCallback(error);
           return result;
        });
        return result;
    }

    getHintWords() {
       let uri = this.testUri + "/hints";
       let jsonString = axios.get(uri)
       .then((res) => {
           let jsonString = res.data;
           console.log("success to get jsonData :" + jsonString);
           return jsonString
       })
       .catch(catchCallback);
       return jsonString
    }

    getLogInfos(offset, size, callback) {
       let uri = this.testUri + "/log_infos?offset=" + offset + "&size=" + size;
       let jsonString = axios.get(uri)
       .then((res) => {
           let jsonString = res.data;
           console.log("success to get jsonData :" + jsonString);
           //return jsonString
           if (callback) {
             callback(jsonString);
           }
           else {
             return jsonString
           }
       })
       .catch(catchCallback);
       return jsonString
    }

}

let getResponse = (method, path, params, data) => {
    let baseURL = SERVER_BASE_URI + path;
    let content = axios.request({ method, params, baseURL, data})
    .then((res) => {
        let content = res.data;
        console.log("success :", method, baseURL);
        return content
    })
    .catch((error) => {
        console.log("fail :", method, baseURL);
        if (error.response) {
            console.log("data : " + error.response.data);
            console.log("status : " + error.response.status);
            console.log("header : " + JSON.stringify(error.response.headers));
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    });
    return content

}

let catchCallback = (error) => {
    if (error.response) {
        console.log("data : " + error.response.data);
        console.log("status : " + error.response.status);
        console.log("header : " + JSON.stringify(error.response.headers));
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log("Error", error.message);
    }
}

let ajaxService = new AjaxService();

export default ajaxService
