import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json"
import { RequestResult } from "../../../../Components/Types/RequestResult";
import { CreateUrlItem } from "../../../../Components/Types/UrlItem";

interface AddUrlItemServiceProps{
  urlItemData: CreateUrlItem,
  setGoodRequest: (arg:RequestResult) => void
  setBadRequest: (arg:RequestResult) => void
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
          if(responce.data.name === "AxiosError"){
            props.setBadRequest({
              show: true,
              message: responce.data.message
            })
          }
          else{
            props.setGoodRequest({
              show: true,
              message: "Added new url to list with id:" + responce.data
            })
          }
          console.log(responce.data);
        })
        .catch((e) => {
          props.setBadRequest({
            show: true,
            message: e
          })
        });
}

export default AddUrlItemService;