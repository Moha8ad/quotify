import React from "react";

import { connect } from "react-redux";

import COLOR_PALETTE from "../../reusable/random-color/random-color";

import QuotifyButtonPanel from "../button-panel/button-panel";

import "./styles.scss";

const QuotifyCard = ({ cardItem, trash, repeat }) => {
  const randomColor = COLOR_PALETTE[Math.floor(Math.random() * 25)];

  return (
    <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-4 py-3">
      <div className="hover-scale row d-flex justify-content-center border border-secondary bg-dark border-1 rounded-3">
        <div className="col-12 col-lg-6 px-2 auth-img-library-animation">
          <img
            alt="img"
            src={`https://robohash.org/${[cardItem.authorId]}?&&size=180x180`}
          />
        </div>
        <div className="col-auto col-sm-6 d-flex align-self-end fs-4 py-2 d-none d-lg-block auth-name-library-animation">
          <div
            className="px-2 border-2 rounded-1 fs-6"
            style={{
              color: randomColor,
              backgroundColor: "rgba(26, 21, 25, 0.400)",
            }}
          >
            {cardItem.author}
          </div>
        </div>

        <div
          className="row p-1 border-2 rounded-1 overflow-scroll"
          style={{ backgroundColor: randomColor, height: "150px" }}
        >
          <div
            className="col-12 p-0 border-2 rounded-1"
            style={{
              color: randomColor,
              backgroundColor: "rgba(26, 21, 25, 0.400)",
            }}
          >
            <div
              className="fs-6 px-2"
              style={{
                color: randomColor,
                backgroundColor: "rgba(26, 21, 25, 0.400)",
              }}
            >
              <div className="row">
                <div className="col d-lg-none">{cardItem.author}</div>
                <QuotifyButtonPanel
                  item={cardItem}
                  trash={trash}
                  repeat={repeat}
                  randomColor={randomColor}
                />
              </div>
            </div>
            <div className="text-light p-2 fs-5">{cardItem.quote}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ quote: { quotesDB } }) => ({
  quotesDB,
});

export default connect(mapStateToProps)(QuotifyCard);
