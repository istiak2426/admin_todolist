import React, { useState, useEffect, useCallback } from "react";
import { usersWishlist } from "../Firebase";

const Dashboard = ({ userid }) => {
  const [wishlist, setWishlist] = useState("");
  const [completeWishlist, setCompleteWishlist] = useState([]);

  const removeWishlist = useCallback(
    (index) => {
      const thisUser = usersWishlist.child(userid);
      let updatedWishlist = completeWishlist.slice();
      updatedWishlist.splice(index, 1);
      setCompleteWishlist(updatedWishlist);
      thisUser.set({ completeWishlist: updatedWishlist });
    },
    [completeWishlist, userid]
  );

  const addWishlist = useCallback(() => {
    const thisUser = usersWishlist.child(userid);
    const updatedWishlist = [...completeWishlist, wishlist];
    setCompleteWishlist(updatedWishlist);
    thisUser.set({ completeWishlist: updatedWishlist });
  }, [completeWishlist, wishlist, userid]);

  useEffect(() => {
    const thisUser = usersWishlist.child(userid);
    const onDataChange = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCompleteWishlist(data.completeWishlist || []);
      }
    };

    thisUser.on("value", onDataChange);

    return () => {
      thisUser.off("value", onDataChange);
    };
  }, [userid]);

  const renderWishlist = () => {
    return completeWishlist.map((item, index) => {
      return (
        <li className="list-group-item" key={index}>
          {item}
          <button
            className="btn btn-danger"
            style={{ margin: "10px" }}
            onClick={() => removeWishlist(index)}
          >
            Delete
          </button>
        </li>
      );
    });
  };

  return (
    <div className="container" style={{ margin: "5%" }}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="What is your Wishlist ?"
              onChange={(e) => setWishlist(e.target.value)}
            />
            <button
              className="btn btn-primary"
              style={{ margin: "15px" }}
              onClick={addWishlist}
            >
              Add To Wishlist
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <ul className="list-group">{renderWishlist()}</ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
