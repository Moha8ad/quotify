import { useNavigate } from "react-router-dom";

import QuotifyTopbar from "../../components/topbar/topbar";
import QuotifyNavbar from "../../components/navbar/navbar";
import QuotifyFooter from "../../components/footer/footer";
import QuotifyMainHome from "../../components/main-home/main-home";

import COLOR_PALETTE from "../../reusable/random-color/random-color";

import "../quotify.styles.scss";
import "./styles.scss";

const HomePageQuotify = ({}) => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row">
        <QuotifyNavbar />
        <div
          className="qt-page-home qt-main col-12 col-sm-10 overflow-scroll"
          style={{
            backgroundColor: COLOR_PALETTE[Math.floor(Math.random() * 25)],
          }}
        >
          <div className="row">
            <QuotifyTopbar forward={() => navigate(1)} />
            <QuotifyMainHome />
          </div>
        </div>
        <QuotifyFooter />
      </div>
    </div>
  );
};

export default HomePageQuotify;
