import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import LinkConfig from "../../Assets/jsonData/LinkConfig/LinkConfig.json";

import { Link } from "react-router-dom";
import { RequestResult } from "../Types/RequestResult";
import { ShortUrlItem } from "../Types/UrlItem";
import TextData from "../../Assets/jsonData/TextData/en.json"
import DeleteUrlItem from "./Services/DeleteUrlItem"

interface TableElementProps {
  index: number;
  elementData: ShortUrlItem;
  isCustomer?: boolean;
  setAddNewUrl: (arg: boolean) => void;
  setGoodRequest: (arg: RequestResult) => void;
  setBadRequest: (arg: RequestResult) => void;
}

function TableElement(props: TableElementProps) {

  return (
    <tr className="align-middle text-center">
      <td>
        {props.elementData && props.elementData.id && (
          <Link
            to={{
              pathname: LinkConfig.url_item_management.url_item_info + `/${props.elementData.id}`,
              state: { id: `${props.elementData.id}` },
            }}
          >
            {TextData.Identifier}
          </Link>
        )}
      </td>
      <td>{props.elementData.url}</td>
      <td>{props.elementData.shortUrl}</td>
      {!props.isCustomer ? (
        <td>
          <Button
            onClick={() =>
              props.setAddNewUrl(true)
            }
            variant="dark"
          >
            {TextData.AddNewUrl}
          </Button>
        </td>
      ) : (
        <div>
        </div>
      )}
      {!props.isCustomer ? (
        <td>
          <Button
            onClick={() =>
              DeleteUrlItem(props.elementData.id)
            }
            variant="dark"
          >
            {TextData.DeleteUrlItem}
          </Button>
        </td>
      ) : (
        <div>
        </div>
      )}
    </tr>
  );
}

export default TableElement;
