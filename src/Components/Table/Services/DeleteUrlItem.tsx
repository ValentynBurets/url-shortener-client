import axios from "axios";
import ConnectionConfig from "../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json"

const DeleteUrlItemService = (Id: string) => {
    if (Id == null) {
        alert("Id isn`t correct");
        return;
    }
    
    // console.log(lotData)
    let token = localStorage.getItem("token");
    axios
        .delete(
          `${
            ConnectionConfig.ServerUrl + ConnectionConfig.Routes.UrlItem.Delete +
            "?Id=" + Id
          }`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((responce) => {
          console.log(responce.data);
        })
        .catch((e) => {
          console.log(e);
          alert(e);
        });

        

}

export default DeleteUrlItemService;