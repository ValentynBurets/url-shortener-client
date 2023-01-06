import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json"
import { CreateUrlItem } from "../../../../Components/Types/UrlItem";

interface AddUrlItemServiceProps{
  urlItemData: CreateUrlItem,
  setResult: (arg:string) => void
} 

const AddUrlItemService = (props: AddUrlItemServiceProps) => {
    if (props.urlItemData == null) {
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
          props.urlItemData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((responce) => {
          props.setResult(responce.data.message);
          //console.log(responce.data.message);
        })
        .catch((e) => {
          props.setResult(e.message);
          console.log(e);
          alert(e);
        });
}

export default AddUrlItemService;