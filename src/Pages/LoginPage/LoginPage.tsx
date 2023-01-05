import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import resources from "../../Assets/jsonData/TextData/en.json"
import AuthorizeBox from "./Components/AuthorizeBox/AuthorizeBox";
import style from "./LoginPage.module.sass";

function LoginPage() {
  return (
    <Container fluid className={style.start_page}>
      <Row>
        <Col md={{ offset: 1 }} className={style.present_col}>
          <Container>
            <Row>
              <Col xxl={12}>
                <div className={style.head_title_text_box}>
                  <p>{resources.HeadBox.Title}</p>
                </div>
                <div className={style.head_text_box}>
                  <p>{resources.HeadBox.Text}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="authorize_col">
          <AuthorizeBox />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
