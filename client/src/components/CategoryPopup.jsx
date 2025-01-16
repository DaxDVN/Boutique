import React, { useCallback, useEffect, useState } from "react";
import CategoryTag from "./CategoryTag.jsx";

function CategoryPopup({ query, setQuery })
{
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleClick = useCallback((tag) =>
  {
    setSelectedCategory(tag.toLowerCase());
  }, []);

  useEffect(() =>
  {
    const category = selectedCategory === "all" ? "" : selectedCategory
    if (category !== query.category) {
      setQuery({
        ...query,
        category: category,
        page: 1,
        keyword: ""
      })
    }
  }, [selectedCategory]);

  return (
    <div className={"space-y-2"}>
      <CategoryTag
        tag={"All"}
        type={"selection"}
        selectedCategory={selectedCategory}
        handleClick={handleClick}
      />
      <CategoryTag tag={"Iphone & Mac"} type={"label"} />
      <CategoryTag
        tag={"IPhone"}
        type={"selection"}
        selectedCategory={selectedCategory}
        handleClick={handleClick}
      />
      <CategoryTag
        tag={"Ipad"}
        type={"selection"}
        selectedCategory={selectedCategory}
        handleClick={handleClick}
      />
      <CategoryTag
        tag={"Macbook"}
        type={"selection"}
        selectedCategory={selectedCategory}
        handleClick={handleClick}
      />
      <CategoryTag tag={"Wireless"} type={"label"} />
      <CategoryTag
        tag={"Airpod"}
        type={"selection"}
        selectedCategory={selectedCategory}
        handleClick={handleClick}
      />
      <CategoryTag
        tag={"Watch"}
        type={"selection"}
        selectedCategory={selectedCategory}
        handleClick={handleClick}
      />
      <CategoryTag tag={"Other"} type={"label"} />
      <CategoryTag
        tag={"Mouse"}
        type={"selection"}
        selectedCategory={selectedCategory}
        handleClick={handleClick}
      />
      <CategoryTag
        tag={"Keyboard"}
        type={"selection"}
        selectedCategory={selectedCategory}
        handleClick={handleClick}
      />
      <CategoryTag
        tag={"Other"}
        type={"selection"}
        selectedCategory={selectedCategory}
        handleClick={handleClick}
      />
    </div>
  );
}

export default CategoryPopup;
