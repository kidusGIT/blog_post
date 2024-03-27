import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import placeholder from "../asset/placeholder.png";
import { Link } from "react-router-dom";
import url from "../utils/urls";

const Card = ({ title, desc, id, image }) => {
  return (
    <div className="flex-col flex-gap border-rd" style={{ overflow: "hidden" }}>
      <img
        src={
          image === "" ? placeholder : `${url.HTTP}${image?.replace("\\", "/")}`
        }
        alt=""
        className="width-full image-size"
      />
      <div className="flex-col flex-gap padding">
        <h5 className="card-title"> {`${title.slice(0, 25)}..`} </h5>
        <span>{desc.slice(0, 50)}</span>
        <Link to={`/blog-show/${id}`} className=" btn btn-primary">
          Show more <OpenInNewIcon />
        </Link>
      </div>
    </div>
  );
};

export default Card;
