import React from "react";
import Banner from "../components/Banner.jsx";
import Categories from "../components/Categories.jsx";
import TrendingProducts from "../components/TrendingProducts.jsx";
import AdditionalSection from "../components/AdditionalSection.jsx";

function Home()
{
  return (
    <div>
      <div className={"mt-4"}>
        <Banner />
      </div>
      <div className={"mt-10"}>
        <Categories />
      </div>
      <div className={"mt-10"}>
        <TrendingProducts />
      </div>
      <div className={"my-10"}>
        <AdditionalSection />
      </div>
    </div>
  );
}

export default Home;
