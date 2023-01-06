import style from "../../AuthorizeBox.module.sass";
import resources from "../../../../../../Assets/jsonData/TextData/en.json";
import connection from "../../../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import AuthorizeService from "../../../../Services/AuthorizeService";
import { useAuth } from "../../../../../../Components/AuthProvider/AuthProvider";

function RegisterForm() {
  const currentHistory = useHistory();
  const { login } = useAuth();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    passwordVisible: false,
    validated: false,
    authorizedState: false,
    authorizedMessage: "",
    errorMessage: "",
  });
  const passwordValidPattern =
    "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?~_+-=|]).{10,25}$";

  function handleSubmit(event: {
    preventDefault: () => void;
    currentTarget: { checkValidity: () => any };
  }) {
    event.preventDefault();

    setFormState((prev) => {
      return { ...prev, validated: true };
    });

    const isFormValid = event.currentTarget.checkValidity();

    if (isFormValid) {
      const userData = {
        email: formState.email,
        password: formState.password,
      };

      AuthorizeService.request(
        userData,
        connection.ServerUrl + connection.Routes.RegisterUser
      ).then((response) => {
        if (response.authorize === true) {
          // Set jwt token
          localStorage.setItem("token", response.token);

          login();

          currentHistory.push("/new_order");
        } else {
          let error =
            resources.AuthorizeBox.RegisterTab.ErrorText.IncorrectData;

          setFormState((prev) => {
            return {
              ...prev,
              authorizedState: response.authorize,
              authorizedMessage: response.message,
              errorMessage: error,
            };
          });
        }
      });
    }
  }

  return (
    <Form noValidate validated={formState.validated} onSubmit={handleSubmit}>
      {/* Display this block if errorMessage not empty */}
      <div
        className={style.error_message_box}
        style={{
          visibility: Boolean(formState.errorMessage) ? "visible" : "hidden",
        }}
      >
        {formState.errorMessage}
      </div>

      <Form.Group className="mb-3" controlId="userEmail">
        <Form.Label>
          {resources.AuthorizeBox.RegisterTab.Labels.LogIn}
        </Form.Label>
        <InputGroup>
          <Form.Control
            value={formState.email}
            onChange={(event) =>
              setFormState((prev) => {
                return { ...prev, email: event.target.value };
              })
            }
            className="ig-form-control"
            type="email"
            placeholder={resources.AuthorizeBox.RegisterTab.Placeholders.Email}
            maxLength={30}
            required
          />
          <Form.Control.Feedback type="invalid">
            {resources.AuthorizeBox.RegisterTab.InvalidText.Email}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-4" controlId="userPassword">
        <Form.Label>
          {resources.AuthorizeBox.RegisterTab.Labels.Password}
        </Form.Label>
        <InputGroup>
          <Form.Control
            value={formState.password}
            onChange={(event) =>
              setFormState((prev) => {
                return { ...prev, password: event.target.value };
              })
            }
            className="ig-form-control"
            type={formState.passwordVisible === true ? "text" : "password"}
            placeholder={
              resources.AuthorizeBox.RegisterTab.Placeholders.Password
            }
            pattern={passwordValidPattern}
            maxLength={30}
            required
          />
          <i
            onClick={() =>
              setFormState((prev) => {
                return { ...prev, passwordVisible: !prev.passwordVisible };
              })
            }
            className={
              formState.passwordVisible
                ? "bi bi-eye fs-4 eye-icon"
                : "bi bi-eye-slash fs-4 eye-icon"
            }
            style={{ marginLeft: "10px" }}
          ></i>
          <Form.Control.Feedback type="invalid">
            {resources.AuthorizeBox.RegisterTab.InvalidText.Password}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="text-center mt-3" controlId="submitButton">
        <Button variant="primary" type="submit" className="submit-button">
          {resources.AuthorizeBox.RegisterTab.ButtonText}
        </Button>
      </Form.Group>
    </Form>
  );
}

export default RegisterForm;
