import React from "react";
import { connect } from "react-redux";

import QuotifyHorizontalCardsBox from "../horizontal-cards-box/horizontal-cards-box";

import "./styles.scss";

class QuotifyMainList extends React.Component {
  render() {
    const {
      inspirationalList,
      insightfulList,
      searchByNameinspirationalList,
      searchByNameinsightfulList,
    } = this.props;

    return (
      <div>
        {/* Inspirational Quotes List */}
        <QuotifyHorizontalCardsBox
          header="Inspirational Quotes"
          list={inspirationalList}
          searchList={searchByNameinspirationalList}
          linkToLibrary={true}
        />

        {/* Insightful Quotes List */}
        <QuotifyHorizontalCardsBox
          header="Insightful Quotes"
          list={insightfulList}
          searchList={searchByNameinsightfulList}
          linkToLibrary={true}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ quote: { inspirationalList, insightfulList } }) => ({
  inspirationalList,
  insightfulList,
});

export default connect(mapStateToProps, null)(QuotifyMainList);
