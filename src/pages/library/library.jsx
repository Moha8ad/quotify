import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import QuotifyNavbar from "../../components/navbar/navbar";
import QuotifyTopbar from "../../components/topbar/topbar";
import QuotifyFooter from "../../components/footer/footer";
import QuotifyMainLibrary from "../../components/main-library/main-library";

import "./styles.scss";

const LibraryPageQuotify = ({ quotesDB }) => {
  const navigate = useNavigate();

  const [searchField, setSearchField] = useState("");

  const searchByName = quotesDB.filter((name) =>
    name.author.toLowerCase().includes(searchField.toLowerCase())
  );

  const searchByQuote = quotesDB.filter((name) =>
    name.quote.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <QuotifyNavbar />
        <div className="qt-page-library qt-main col-12 col-sm-10 overflow-scroll">
          <div className="row">
            <QuotifyTopbar
              midPart={"searchBox"}
              back={() => navigate(-1)}
              forward={() => navigate(1)}
              handleChange={(e) => setSearchField(e.target.value)}
            />
            <QuotifyMainLibrary
              searchByName={searchByName}
              searchByQuote={searchByQuote}
            />
          </div>
        </div>
        <QuotifyFooter />
      </div>
    </div>
  );
};

const mapStateToProps = ({ quote: { quotesDB } }) => ({
  quotesDB,
});

export default connect(mapStateToProps)(LibraryPageQuotify);
