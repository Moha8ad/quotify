import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import QuotifyNavbar from "../../components/navbar/navbar";
import QuotifyTopbar from "../../components/topbar/topbar";
import QuotifyFooter from "../../components/footer/footer";
import QuotifyMainLiked from "../../components/main-liked/main-liked";

import "./styles.css";

const LikedPageQuotify = ({ likedQuotesDB }) => {
  const navigate = useNavigate();

  const [searchField, setSearchField] = useState("");

  const searchByName = likedQuotesDB.filter((name) =>
    name.author.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <QuotifyNavbar />
        <div className="qt-page-liked qt-main col-12 col-sm-10 overflow-scroll">
          <div className="row">
            <QuotifyTopbar
              midPart={likedQuotesDB.length > 0 ? "searchBox" : ""}
              back={() => navigate(-1)}
              forward={() => navigate(1)}
              handleChange={(e) => setSearchField(e.target.value)}
            />
            <QuotifyMainLiked searchByName={searchByName} />
          </div>
        </div>
        <QuotifyFooter />
      </div>
    </div>
  );
};

const mapStateToProps = ({ quote: { likedQuotesDB } }) => ({
  likedQuotesDB,
});

export default connect(mapStateToProps)(LikedPageQuotify);
