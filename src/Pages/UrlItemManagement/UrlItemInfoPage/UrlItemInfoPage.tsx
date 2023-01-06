import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { UrlItem } from "../../../Components/Types/UrlItem";
import LoadUrlInfo from "./Services/LoadUrlInfo";
import TextData from "../../../Assets/jsonData/TextData/en.json";

import style from "./UrlItemInfoPage.module.sass"

const UrlItemInfoPage = () => {
  
  const params: { id: string } = useParams();

  let UrlItemInitialState = {
    id: "",
    creator: {
      email: "",
      role: ""
    },
    url: "",
    shortUrl: "",
    createdDate: ""
  }

  const [urlItem, setUrlItem] = useState<UrlItem>(UrlItemInitialState);

  useEffect(() => {
    LoadUrlInfo({
      id: params.id,
      setUrlItem: setUrlItem
    })
  }, [params.id])

  return(
    <div className={style.container_style}>
      <Form className={style.form_style}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{TextData.Info.Identifier.Title}</Form.Label>
        <Form.Control type="text" placeholder={urlItem.id} />
        <Form.Text className="text-muted">
          {TextData.Info.Identifier.Description}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{TextData.Info.Url.Title}</Form.Label>
        <Form.Control type="text" placeholder={urlItem.url} />
        <Form.Text className="text-muted">
          {TextData.Info.Url.Description}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{TextData.Info.ShortUrl.Title}</Form.Label>
        <Form.Control type="text" placeholder={urlItem.shortUrl} />
        <Form.Text className="text-muted">
          {TextData.Info.ShortUrl.Description}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{TextData.Info.CreatorLogin.Title}</Form.Label>
        <Form.Control type="text" placeholder={urlItem.creator.email} />
        <Form.Text className="text-muted">
          {TextData.Info.CreatorLogin.Description}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{TextData.Info.CreatorRole.Title}</Form.Label>
        <Form.Control type="text" placeholder={urlItem.creator.role} />
        <Form.Text className="text-muted">
          {TextData.Info.CreatorRole.Description}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{TextData.Info.CreatedDate.Title}</Form.Label>
        <Form.Control type="text" placeholder={urlItem.createdDate} />
        <Form.Text className="text-muted">
          {TextData.Info.CreatedDate.Description}
        </Form.Text>
      </Form.Group>
      {/* <Button variant="primary" type="submit">
        Back
      </Button> */}
    </Form>
    </div>
  )
}

export default UrlItemInfoPage