import React from "react";
import { RequestResult } from "../Types/RequestResult";
import TableElement from "./TableElement";
import { ShortUrlItem } from "../Types/UrlItem";

interface TbodyProps {
  bodyData: ShortUrlItem[];
  setAddNewUrl: (arg: boolean) => void;
  setListUpdate: (arg:boolean) => void;
  isCustomer?: boolean;
  setGoodRequest: (arg: RequestResult) => void;
  setBadRequest: (arg: RequestResult) => void;
}

function Tbody(props: TbodyProps) {
  return (
    <tbody>
      {props.bodyData &&
        props.bodyData.map((elem: ShortUrlItem, index: number) => (
          <TableElement
            setGoodRequest={props.setGoodRequest}
            setBadRequest={props.setBadRequest}
            isCustomer={props.isCustomer}
            elementData={elem}
            key={index}
            setAddNewUrl={props.setAddNewUrl}
            index={index}
            setListUpdate={(arg: boolean) => {
              props.setListUpdate(arg);
            }}
          />
        ))}
    </tbody>
  );
}

export default Tbody;
