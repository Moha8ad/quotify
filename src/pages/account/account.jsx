import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import QuotifyFooter from "../../components/footer/footer";
import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";

const AccountPageQuotify = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    let unsubscribeFromAuth = null;

    const handleAuthStateChanged = async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    };

    unsubscribeFromAuth = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => {
      unsubscribeFromAuth();
    };
  }, [setCurrentUser]);

  return (
    <div>
      {!currentUser ? (
        <div
          className="container-fluid d-flex justify-content-center align-items-start bg-dark text-light p-5"
          style={{ minHeight: "100vh" }}
        >
          <div className="row ">
            <div className="col-12 fixed-top p-3">
              <div className="row">
                <div>
                  <i
                    className="bi bi-box-arrow-left text-secondary fs-4 px-3"
                    onClick={goBack}
                  ></i>{" "}
                </div>
              </div>
            </div>
            <div className="col-12 p-3"></div>

            <div className="col-12 col-sm-6 p-sm-5">
              <SignIn />
            </div>
            <div className="col-12 col-sm-6 pb-5 py-4 px-sm-5">
              <SignUp />
            </div>
            <QuotifyFooter />
          </div>
        </div>
      ) : (
        <Navigate replace to={"/"} />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageQuotify);
