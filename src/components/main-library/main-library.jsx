import React from "react";

import QuotifyCard from "../card/card";

import "./styles.scss";

const QuotifyMainLibrary = ({ searchByName, searchByQuote }) => (
  <div>
    {searchByName.length > 0 || searchByQuote.length > 0 ? (
      <div className="row">
        {searchByName.map((cardItem, key) => (
          <QuotifyCard key={key} cardItem={cardItem} />
        ))}
        {searchByQuote.map((cardItem, key) => (
          <QuotifyCard key={key} cardItem={cardItem} />
        ))}
      </div>
    ) : (
      <div className="fs-4 text-danger p-4">Result Not Found</div>
    )}
  </div>
);

export default QuotifyMainLibrary;
