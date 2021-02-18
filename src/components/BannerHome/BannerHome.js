import React, { useState, useEffect } from "react";
import "./BannerHome.scss";
import firebase from "../../utils/firebase";

const BannerHome = () => {
  const [bannerUrl, setBannerUrl] = useState();

  useEffect(() => {
    firebase
      .storage()
      .ref("others/banner-home.jpg")
      .getDownloadURL()
      .then(setBannerUrl);
  }, [bannerUrl]);

  if (!bannerUrl) return null;

  return (
    <div
      className="banner-home"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    />
  );
};

export default BannerHome;
