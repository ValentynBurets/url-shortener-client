import React from "react";

import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";

import { UrlItem } from "../../../../Components/Types/UrlItem";

interface LoadUrlInfoProps {
  id: string;
  setUrlItem: (arg: UrlItem) => void;
}

const GetAllUrlItemsService = (props: LoadUrlInfoProps) => {
  let token = localStorage.getItem("token");

  axios
    .get(
      `${
        ConnectionConfig.ServerUrl +
        ConnectionConfig.Routes.UrlItem.GetById +
        "?Id=" +
        props.id
      }`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((responce) => {
      props.setUrlItem(responce.data);
    })
    .catch((e) => {
      console.log(e);
      alert(e);
    });
};

export default GetAllUrlItemsService;
