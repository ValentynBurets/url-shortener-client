import React from "react";
import Button from "react-bootstrap/Button";
import LinkConfig from "../../Assets/jsonData/LinkConfig/LinkConfig.json";

import { Link, useHistory } from "react-router-dom";
import { RequestResult } from "../Types/RequestResult";
import { ShortUrlItem } from "../Types/UrlItem";
import TextData from "../../Assets/jsonData/TextData/en.json";
import DeleteUrlItem from "./Services/DeleteUrlItem";
import { useAuth } from "../AuthProvider/AuthProvider";

interface TableElementProps {
  index: number;
  elementData: ShortUrlItem;
  isCustomer?: boolean;
  setAddNewUrl: (arg: boolean) => void;
  setListUpdate: (arg: boolean) => void;
  setGoodRequest: (arg: RequestResult) => void;
  setBadRequest: (arg: RequestResult) => void;
}

function TableElement(props: TableElementProps) {
  const { user } = useAuth();
  const currentHistory = useHistory();
  const onClick = () => {
    currentHistory.push(
      LinkConfig.url_item_management.url_item_info + `/${props.elementData.id}`
    );
  };

  return (
    <tr className="align-middle text-center">
      <td>
        {props.elementData && props.elementData.id && (
          <Link
            to={{
              pathname:
                LinkConfig.url_item_management.url_item_info +
                `/${props.elementData.id}`,
              state: { id: `${props.elementData.id}` },
            }}
          >
            {TextData.Identifier}
          </Link>
        )}
      </td>
      <td onClick={() => onClick()}>{props.elementData.url}</td>
      <td onClick={() => onClick()}>{props.elementData.shortUrl}</td>
      {user.role === "Admin" ? (
        <td>
          <Button
            onClick={() => {
              DeleteUrlItem(props.elementData.id);
              props.setListUpdate(true);
            }}
            variant="dark"
          >
            {TextData.DeleteUrlItem}
          </Button>
        </td>
      ) : (
        <div></div>
      )}
    </tr>
  );
}

export default TableElement;
