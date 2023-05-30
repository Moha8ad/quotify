import React from "react";
import { connect } from "react-redux";

import QuotifyHorizontalCardsBox from "../horizontal-cards-box/horizontal-cards-box";

import "./styles.scss";

const QuotifyMainCreate = ({
  searchByNameAddedQuoteCard,
  handleChange,
  handleSubmit,
  authorInput,
  quoteInput,
  addedQuoteCard,
}) => (
  <div className="col-12 text-light">
    <div className="row">
      <div className="col-12">
        <div className="fs-5 py-2">Add Quote to your personal library</div>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-12 col-sm-3 py-1">
            <div className="form-floating" style={{ color: "black" }}>
              <input
                className="form-control "
                placeholder="Enter Author Name"
                id="floatingTextarea2"
                type="text"
                name="authorInput"
                value={authorInput}
                onChange={handleChange}
              />
              <label for="floatingTextarea2">Author</label>
            </div>
          </div>
          <div className="col-12 col-sm-6 py-1">
            <div className="form-floating" style={{ color: "black" }}>
              <input
                className="form-control"
                placeholder="Enter Quote"
                id="floatingTextarea2"
                type="text"
                name="quoteInput"
                value={quoteInput}
                onChange={handleChange}
              />
              <label for="floatingTextarea2">Quote</label>
            </div>
          </div>
          <div className="col-12 col-sm-3 py-1">
            <div className="col">
              {authorInput && quoteInput ? (
                <button className="btn btn-success py-3" onClick={handleSubmit}>
                  Add to My Library
                </button>
              ) : authorInput ? (
                <button
                  className="btn btn-outline-warning py-3"
                  style={{ cursor: "default" }}
                >
                  Enter Quote
                </button>
              ) : quoteInput ? (
                <button
                  className="btn btn-outline-warning py-3"
                  style={{ cursor: "default" }}
                >
                  Enter Author
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary py-3"
                  style={{ cursor: "not-allowed" }}
                >
                  Enter Author and Quote
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <QuotifyHorizontalCardsBox
          header="My Quotes Library"
          list={addedQuoteCard}
          searchList={searchByNameAddedQuoteCard}
          trash={true}
        />
      </div>
    </div>
  </div>
);

const mapStateToProps = ({
  quote: { addedQuoteCard },
  user: { currentUser },
}) => ({
  addedQuoteCard,
  currentUser,
});

export default connect(mapStateToProps)(QuotifyMainCreate);
