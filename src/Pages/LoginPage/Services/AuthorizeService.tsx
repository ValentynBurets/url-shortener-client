import axios from "axios";
import { UserData } from "../../../Components/Types/UserData";

const AuthorizeService = {
    request: function (userData: UserData, url: string) {
        return axios({
            url: url,
            method: "POST",
            data: userData,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            if (response.status === 202) {
                return { authorize: true, token: response.data.token, message: response.status };
            }
            else {
                return { authorize: false, token: "", message: response.status };
            }
        }).catch((error) => {
            return { authorize: false, token: "", message: error.toString() };
        });
    }
}

export default AuthorizeService;