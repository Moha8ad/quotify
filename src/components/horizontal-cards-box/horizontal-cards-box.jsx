import React from "react";
import { Link } from "react-router-dom";

import QuotifyCard from "../card/card";

import "./styles.scss";

const QuotifyHorizontalCardsBox = ({
  header,
  list,
  searchList,
  trash,
  linkToLibrary,
}) => (
  <div>
    <div className="fs-4 pt-4 text-secondary">{header}</div>
    <div className="container d-flex text-secondary overflow-scroll">
      {list.length < 1 ? (
        <div className="p-4">
          <div className="pb-4 text-secondary">
            <span className="fs-6">
              Quotes you add to {header} will appear here.
            </span>
            <br />
          </div>
          {linkToLibrary ? (
            <Link to="/library">
              <button className="btn btn-primary fs-6" type="button">
                Find Quotes
              </button>
            </Link>
          ) : null}
        </div>
      ) : searchList.length > 0 ? (
        searchList.map((cardItem) => (
          <QuotifyCard cardItem={cardItem} trash={trash} />
        ))
      ) : (
        <div className="fs-4 text-danger p-4">Result Not Found</div>
      )}
      <hr className="text-secondary" />
    </div>
  </div>
);

export default QuotifyHorizontalCardsBox;
