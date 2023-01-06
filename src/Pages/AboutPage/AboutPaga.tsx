import React, { useState, useEffect } from "react";
import { useAuth } from "../../Components/AuthProvider/AuthProvider";
import style from "./AboutPaga.module.sass";
import { Button } from "react-bootstrap";
import TextData from "../../Assets/jsonData/TextData/en.json";

const AboutPage = () => {
  const { user } = useAuth();
  const [text, setText] = useState<string>("test text");

  const UpdateText = () => {};

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(event.target.value);
  };

  return (
    <div className={style.center_content}>
      <div className={style.container_style}>
        <textarea
          value={text}
          onChange={handleChange}
          disabled={user.role === "Admin" ? false : true}
        />
      </div>

      {user.role === "Admin" && (
        <div>
          <Button
            style={{ marginLeft: "80%" }}
            onClick={() => UpdateText()}
            variant="dark"
          >
            {TextData.Edit}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
