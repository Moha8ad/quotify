import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  auth,
  signInWithGoogle,
  createUserProfileDocument,
  db,
} from "../../firebase/firebase.utils";

import { setCurrentUser } from "../../redux/user/user.actions";

import {
  setQuotesDataBase,
  setLikedQuote,
  setLikedQuoteAsync,
} from "../../redux/quote/quote.actions";

import SearchBox from "../../reusable/search-box/search-box";

import { Topbar } from "./styles";

const QuotifyTopbar = ({
  setLikedQuoteAsync,
  isFetching,
  setCurrentUser,
  setQuotesDataBase,
  setLikedQuote,
  handleChange,
  midPart,
  currentUser,
  back,
  forward,
}) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);

      userAuth ? setLikedQuoteAsync(userAuth.uid) : setLikedQuoteAsync(null);

      db.collection("collections").onSnapshot((snapshot) => {
        const quotesDataBase = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setQuotesDataBase(quotesDataBase);
      });

      //addCollectionAndDocuments('Col', QUOTES_DATA.map(({quotes}) => ({quotes})));
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, [setCurrentUser, setLikedQuoteAsync, setQuotesDataBase]);

  return (
    <Topbar className="col-12 sticky-top me-auto py-2">
      <div className="row d-flex flex-wrap align-items-center fs-5 fw-bold text-light ps-2">
        <div className="col-auto">
          <i
            className="bi bi-arrow-left-circle fs-2 cursor-pointer"
            onClick={back}
          />
          <i
            className="bi bi-arrow-right-circle fs-2 ps-3 cursor-pointer"
            onClick={forward}
          />
        </div>
        <div className="col-7 col-sm-6 col-md-auto me-auto">
          {midPart === "searchBox" ? (
            <SearchBox
              placeholder={"Search for Authors"}
              handleChange={handleChange}
            />
          ) : null}
        </div>
        {!isFetching && "Loading"}
        <div className="col-auto ms-auto me-2">
          {currentUser ? (
            <div className="dropdown d-none d-sm-block">
              <button
                className="btn btn-sm btn-success"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div>Hello, {currentUser.displayName}</div>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton1"
              >
                <li
                  className="dropdown-item cursor-pointer"
                  onClick={() => auth.signOut()}
                >
                  Sign out
                </li>
              </ul>
            </div>
          ) : (
            <div className="dropdown d-none d-sm-block">
              <button
                className="btn btn-sm btn-dark"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div>Hello, Sign in</div>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton1"
              >
                <Link to="/account" style={{ textDecoration: "none" }}>
                  <li className="dropdown-item">Sign in/ Sign up</li>
                </Link>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li
                  className="dropdown-item cursor-pointer"
                  onClick={signInWithGoogle}
                >
                  Login with <i className="bi bi-google"></i>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </Topbar>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setQuotesDataBase: (quotesDB) => dispatch(setQuotesDataBase(quotesDB)),
  setLikedQuote: (likedQuote) => dispatch(setLikedQuote(likedQuote)),
  setLikedQuoteAsync: (userId) => dispatch(setLikedQuoteAsync(userId)),
});

const mapStateToProps = ({ user: { currentUser }, quote: { isFetching } }) => ({
  currentUser,
  isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuotifyTopbar);
