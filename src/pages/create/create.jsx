import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addQuoteCard } from "../../redux/quote/quote.actions";

import QuotifyNavbar from "../../components/navbar/navbar";
import QuotifyTopbar from "../../components/topbar/topbar";
import QuotifyFooter from "../../components/footer/footer";
import QuotifyMainCreate from "../../components/main-create/main-create";

const SearchPageQuotify = ({ history, addedQuoteCard, addQuoteCard }) => {
  const navigate = useNavigate();

  const [quoteInfo, setQuoteInfo] = useState({
    searchField: "",
    authorInput: "",
    quoteInput: "",
    authorId: 20,
    quoteId: 20,
  });

  const { searchField, authorInput, quoteInput, quoteId, authorId } = quoteInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuoteInfo({
      ...quoteInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setQuoteInfo({
      authorInput: "",
      quoteInput: "",
      searchField: searchField,
      authorId: authorId + 1,
      quoteId: quoteId + 1,
    });

    addQuoteCard(authorInput, quoteInput, quoteId, authorId);
  };

  const searchByNameAddedQuoteCard = addedQuoteCard.filter((name) =>
    name.author.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <QuotifyNavbar />
        <div className="qt-page-create qt-main col-12 col-sm-10 overflow-scroll">
          <div className="row">
            <QuotifyTopbar
              midPart={addedQuoteCard.length > 0 ? "searchBox" : null}
              back={() => navigate(-1)}
              forward={() => navigate(1)}
              handleChange={handleChange}
            />

            <QuotifyMainCreate
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              searchByNameAddedQuoteCard={searchByNameAddedQuoteCard}
              authorInput={authorInput}
              quoteInput={quoteInput}
            />
          </div>
        </div>
        <QuotifyFooter />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addQuoteCard: (author, quote, quoteId, authorId) =>
    dispatch(addQuoteCard(author, quote, quoteId, authorId)),
});

const mapStateToProps = ({ quote: { addedQuoteCard } }) => ({
  addedQuoteCard,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageQuotify);
