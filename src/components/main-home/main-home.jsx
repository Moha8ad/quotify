import React from "react";
import { connect } from "react-redux";

import QuotifyButtonPanel from "../button-panel/button-panel";

import COLOR_PALETTE from "../../reusable/random-color/random-color";

import "./styles.scss";

const QuotifyMainHome = ({ quotesDB }) => {
  const randomQuoteId = Math.floor(Math.random() * quotesDB.length);

  const randomQuote =
    quotesDB.length - 5 <= randomQuoteId
      ? quotesDB.filter(
          (card) =>
            card.quoteId <= randomQuoteId && card.quoteId > randomQuoteId - 5
        )
      : quotesDB.filter(
          (card) =>
            card.quoteId >= randomQuoteId && card.quoteId < randomQuoteId + 5
        );

  return (
    <div className="wrapper">
      <div className="box-container">
        {randomQuote.map((cardItem, index) => (
          <div
            key={index}
            className="box grid-column-span-2"
            style={{
              backgroundColor: COLOR_PALETTE[Math.floor(Math.random() * 25)],
            }}
          >
            <div className="box-shadow">
              <div className="btnPanel">
                <QuotifyButtonPanel item={cardItem} home={true} />
              </div>
              <div className="card-info">
                <div>
                  <img
                    src={`https://robohash.org/${[
                      cardItem.authorId,
                    ]}?&&size=180x180`}
                    alt="author"
                  />
                </div>
                <div>{cardItem.author}</div>
              </div>
              <div>
                <p>{cardItem.quote}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ quote: { quotesDB } }) => ({
  quotesDB,
});

export default connect(mapStateToProps, null)(QuotifyMainHome);
