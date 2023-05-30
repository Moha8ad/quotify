import React from "react";

import { connect } from "react-redux";

import {
  setLikedQuote,
  setInspirationalQuote,
  setInsightfulQuote,
  addQuoteCard,
} from "../../redux/quote/quote.actions";

import { removeQuote } from "./button.utils";

import {
  addDocumentToCollection,
  removeDocumentFromCollection,
} from "../../firebase/firebase.utils";

import "./styles.scss";

const QuotifyButtonPanel = ({
  currentUser,
  trash,
  item,
  addQuoteCard,
  setLikedQuote,
  likedQuotesDB,
  setInspirationalQuote,
  inspirationalList,
  setInsightfulQuote,
  insightfulList,
  home,
}) => (
  <div
    id="to-hover"
    className="col-6 ms-auto d-flex justify-content-around align-items-center hover-change"
    style={{
      background: home && "rgba(255, 255, 255, 0.3)",
      width: home && "120px",
      borderRadius: home && "10px",
      padding: home && "5px",
    }}
  >
    {/* Remove Button */}
    {trash ? (
      <span
        id="to-show"
        onClick={() => {
          addQuoteCard(item.author, item.quote, item.quoteId, item.authorId);
          removeQuote(likedQuotesDB, setLikedQuote, item);
          removeQuote(inspirationalList, setInspirationalQuote, item);
          removeQuote(insightfulList, setInsightfulQuote, item);
        }}
      >
        <i className="bi bi-trash"></i>
      </span>
    ) : null}

    {/* Like Button  */}
    <span
      onClick={() =>
        !currentUser?.id && alert("Please Sign in to Like Quotes!")
      }
    >
      {!!currentUser &&
      likedQuotesDB.map((i) => i.quoteId).includes(item.quoteId) ? (
        <i
          className="bi bi-heart-fill text-danger"
          onClick={() => {
            removeDocumentFromCollection(
              `users/${currentUser?.id}/liked`,
              item.id
            );
            setLikedQuote(
              likedQuotesDB.filter((quote) => quote.quoteId !== item.quoteId)
            );
          }}
        />
      ) : (
        <i
          className="bi bi-heart"
          onClick={() => {
            addDocumentToCollection(
              `users/${currentUser?.id}/liked`,
              item?.id,
              item
            );
            setLikedQuote([...likedQuotesDB, item]);
          }}
        />
      )}
    </span>

    {/* List Button */}
    <span className="dropdown">
      {/* Journal Button */}
      <span data-bs-toggle="dropdown" aria-expanded="false">
        {inspirationalList.find(
          (itemQuote) => itemQuote.quoteId === item.quoteId
        ) ||
        insightfulList.find(
          (itemQuote) => itemQuote.quoteId === item.quoteId
        ) ? (
          <i className="bi bi-journal-bookmark-fill"></i>
        ) : (
          <i className="bi bi-journal-bookmark"></i>
        )}
      </span>

      {/* Inspirational List Buttons */}
      <ul
        className="dropdown-menu dropdown-menu-dark text-light"
        style={{ backgroundColor: "rgba(33, 37, 41, 0.95)" }}
      >
        {inspirationalList.find(
          (itemQuote) => itemQuote.quoteId === item.quoteId
        ) ? (
          <li
            className="dropdown-item bi bi-bookmark-dash"
            onClick={() => {
              setInspirationalQuote(item);
              currentUser &&
                removeDocumentFromCollection(
                  `users/${currentUser.id}/inspirationalQuotes`,
                  item.id
                );
            }}
          >
            <span className="px-2">Inspirational List</span>
          </li>
        ) : (
          <li
            className="dropdown-item bi bi-bookmark-plus"
            onClick={() => {
              setInspirationalQuote(item);
              currentUser &&
                addDocumentToCollection(
                  `users/${currentUser.id}/inspirationalQuotes`,
                  item.id,
                  item
                );
            }}
          >
            <span className="px-2">Inspirational List</span>
          </li>
        )}

        {/* Insightful List Buttons */}
        {insightfulList.find(
          (itemQuote) => itemQuote.quoteId === item.quoteId
        ) ? (
          <li
            className="dropdown-item bi bi-bookmark-dash"
            onClick={() => setInsightfulQuote(item)}
          >
            <span className="px-2">Insightful List</span>
          </li>
        ) : (
          <li
            className="dropdown-item bi bi-bookmark-plus"
            onClick={() => setInsightfulQuote(item)}
          >
            <span className="px-2">Insightful List</span>
          </li>
        )}
      </ul>
    </span>

    {/* Copy Button */}
    <span
      onClick={() =>
        navigator.clipboard.writeText(`${item.quote} --${item.author}`)
      }
    >
      <i className="bi bi-clipboard" />
    </span>

    {/* Share Button */}
    <span>
      <a
        href={`https://twitter.com/intent/tweet?text=${item.quote} - ${item.author}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-twitter" />
      </a>
    </span>
  </div>
);

const mapStateToProps = ({
  user: { currentUser },
  quote: { quotesDB, likedQuotesDB, inspirationalList, insightfulList },
}) => ({
  currentUser,
  quotesDB,
  likedQuotesDB,
  inspirationalList,
  insightfulList,
});

const mapDispatchToProps = (dispatch) => ({
  setLikedQuote: (likedQuote) => dispatch(setLikedQuote(likedQuote)),
  addQuoteCard: (author, quote, quoteId, authorId) =>
    dispatch(addQuoteCard(author, quote, quoteId, authorId)),
  setInspirationalQuote: (inspirationalQuote) =>
    dispatch(setInspirationalQuote(inspirationalQuote)),
  setInsightfulQuote: (insightfulQuote) =>
    dispatch(setInsightfulQuote(insightfulQuote)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuotifyButtonPanel);
