import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json"

const GetAllUrlItemsService = (setUrlItems: any) => {
    axios
        .get(
        `${
            ConnectionConfig.ServerUrl + ConnectionConfig.Routes.UrlItem.GetAll
        }`,
    )
    .then((responce) => {
        setUrlItems(responce.data);
    })
    .catch((e) => {
        console.log(e);
        alert(e);
    })
}

export default GetAllUrlItemsService;