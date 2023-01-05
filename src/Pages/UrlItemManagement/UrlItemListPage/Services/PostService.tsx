import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json"

const AddUrlItemService= (urlItemData: any) => {
    if (urlItemData == null) {
        alert("Please add text to the text box to create a new lot");
        return;
    }
    
    // console.log(lotData)
    let token = localStorage.getItem("token");
    axios
        .post(
          `${
            ConnectionConfig.ServerUrl + ConnectionConfig.Routes.UrlItem.Create
          }`,
          urlItemData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((responce) => {
          var data = responce.data;
          //console.log(data);
        })
        .catch((e) => {
          console.log(e);
          alert(e);
        });
}

export default AddUrlItemService;