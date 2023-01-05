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

import TextData from "../../../Assets/jsonData/TextData/en.json"
import ShortenerUrl from "../../../Components/ShortenerUrl/ShortenerUrl";

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

  useEffect(() => {
    GetAllUrlItemsService(setUrlItems);
  }, []);

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
      <Row>
        <Modal
          style={{ display: "flex", marginTop: "10%" }}
          show={addNewUrl}
          tabIndex="-1"
        >
          <Modal.Header>
            <Modal.Title>
              {TextData.AddNewUrl}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ShortenerUrl
                setUrl={(arg: string ) => setUrl(arg)}
                setShortUrl={(arg: string) => setShortUrl(arg)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setAddNewUrl(false)}>
              {TextData.Close}
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </div>
  );
}

export default UrlItemListPage;
