import React, { useState, useEffect } from "react";
import { Row, Modal, Button, Container, Table } from "react-bootstrap";

import GetAllUrlItemsService from "./Services/GetService";
import AddUrlItemService from "./Services/PostService";

import {
  CreateUrlItem,
  ShortUrlItem,
  UrlItem,
} from "../../../Components/Types/UrlItem";
import TheaderList from "../../../Components/Table/TheaderList";
import Tbody from "../../../Components/Table/Tbody";
import { RequestResult } from "../../../Components/Types/RequestResult";

import TextData from "../../../Assets/jsonData/TextData/en.json";
import ShortenerUrl from "../../../Components/ShortenerUrl/ShortenerUrl";

import style from "./UrlItemList.module.sass";
import GoodRequest from "../../../Components/Message/GoodRequest";
import BadRequest from "../../../Components/Message/BadRequest";

function UrlItemListPage() {
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
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    GetAllUrlItemsService(setUrlItems);
  }, []);

  useEffect(() => {
    console.log(result)
  }, [result])

  return (
    <div>
      <BadRequest show={badRequest.show} text={badRequest.message} />
      <GoodRequest show={goodRequest.show} text={goodRequest.message} />
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
                  setResult: setResult,
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
