import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import QuotifyNavbar from "../../components/navbar/navbar";
import QuotifyTopbar from "../../components/topbar/topbar";
import QuotifyFooter from "../../components/footer/footer";
import QuotifyMainList from "../../components/main-list/main-list";

const ListPageQuotify = ({ inspirationalList, insightfulList }) => {
  const navigate = useNavigate();

  const [searchField, setSearchField] = useState("");

  const searchByNameinspirationalList = inspirationalList.filter((name) =>
    name.author.toLowerCase().includes(searchField.toLowerCase())
  );

  const searchByNameinsightfulList = insightfulList.filter((name) =>
    name.author.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <QuotifyNavbar />
        <div className="qt-main col-12 col-sm-10 overflow-scroll">
          <div className="row">
            <QuotifyTopbar
              midPart={
                inspirationalList.length || insightfulList.length > 0
                  ? "searchBox"
                  : null
              }
              back={() => navigate(-1)}
              forward={() => navigate(1)}
              handleChange={(e) => setSearchField(e.target.value)}
            />
            <QuotifyMainList
              searchByNameinspirationalList={searchByNameinspirationalList}
              searchByNameinsightfulList={searchByNameinsightfulList}
            />
          </div>
        </div>
        <QuotifyFooter />
      </div>
    </div>
  );
};

const mapStateToProps = ({ quote: { inspirationalList, insightfulList } }) => ({
  inspirationalList,
  insightfulList,
});

export default connect(mapStateToProps)(ListPageQuotify);
