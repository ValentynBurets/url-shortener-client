import React, { useState, useEffect } from "react";
import { Row, Modal, Button, Table } from "react-bootstrap";

import GetAllUrlItemsService from "./Services/GetService";
import AddUrlItemService from "./Services/PostService";

import { ShortUrlItem } from "../../../Components/Types/UrlItem";
import TheaderList from "../../../Components/Table/TheaderList";
import Tbody from "../../../Components/Table/Tbody";
import {
  RequestResult,
  RequestType,
} from "../../../Components/Types/RequestResult";

import TextData from "../../../Assets/jsonData/TextData/en.json";
import ShortenerUrl from "../../../Components/ShortenerUrl/ShortenerUrl";

import style from "./UrlItemList.module.sass";
import GoodRequest from "../../../Components/Message/GoodRequest";
import BadRequest from "../../../Components/Message/BadRequest";
import { useAuth } from "../../../Components/AuthProvider/AuthProvider";

function UrlItemListPage() {
  const { user } = useAuth();

  const [addNewUrl, setAddNewUrl] = useState<boolean>(false);
  const [goodRequest, setGoodRequest] = useState<RequestResult>({
    show: false,
    message: "",
  });
  const [badRequest, setBadRequest] = useState<RequestResult>({
    show: false,
    message: "",
  });
  const [urlItems, setUrlItems] = useState<ShortUrlItem[]>([]);

  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  useEffect(() => {
    GetAllUrlItemsService(setUrlItems);
  }, [addNewUrl]);

  return (
    <div>
      <Row className="justify-content-md-center mx-auto mt-3 ListOfElem">
        <Table responsive>
          <TheaderList />
          <Tbody
            setGoodRequest={setGoodRequest}
            setBadRequest={setBadRequest}
            bodyData={urlItems}
            setAddNewUrl={(arg: boolean) => {
              setAddNewUrl(arg);
            }}
          />
        </Table>
      </Row>
      <Row className={style.modal_style}>
        {user.role === "User" || user.role === "Admin" ? (
          <td>
            <Button
              style={{ marginLeft: "80%" }}
              onClick={() => setAddNewUrl(true)}
              variant="dark"
            >
              {TextData.AddNewUrl}
            </Button>
          </td>
        ) : (
          <div></div>
        )}
      </Row>
      
        <BadRequest show={badRequest.show} text={badRequest.message} />
        <GoodRequest show={goodRequest.show} text={goodRequest.message} />
      
      <Row className={style.row_style}>
        <Modal className={style.modal_style} show={addNewUrl} tabIndex="-1">
          <Modal.Header>
            <Modal.Title>{TextData.AddNewUrl}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ShortenerUrl
              setUrl={(arg: string) => setUrl(arg)}
              setShortUrl={(arg: string) => setShortUrl(arg)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() =>
                AddUrlItemService({
                  urlItemData: { url: url, shorturl: shortUrl },
                  setGoodRequest: (arg: RequestResult) => setGoodRequest(arg),
                  setBadRequest: (arg: RequestResult) => setBadRequest(arg),
                })
              }
            >
              {TextData.AddNewUrl}
            </Button>
            <Button variant="secondary" onClick={() => setAddNewUrl(false)}>
              {TextData.Close}
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </div>
  );
}

export default UrlItemListPage;
