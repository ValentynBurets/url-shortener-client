import React from "react";
import TextData from "../../Assets/jsonData/TextData/en.json"

function TheaderList() {
  return (
    <thead>
      <tr className="text-center">
        <th>
          {TextData.Identifier}
        </th>
        <th>
          {TextData.Url}
        </th>
        <th>
          {TextData.ShortUrl}
        </th>
        <th></th>
        <th></th>
      </tr>
    </thead>
  );
}

export default TheaderList;