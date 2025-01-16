import React, { memo } from "react";

function CategoryTag({ tag, type, handleClick, selectedCategory }) {
  const isActive = selectedCategory === tag.toLowerCase();
  const baseStyle =
    type === "selection"
      ? "cursor-pointer text-neutral-400 hover:bg-amber-50/20 hover:text-yellow-600"
      : "text-md bg-neutral-200 font-semibold uppercase text-neutral-700";

  return (
    <div
      onClick={() => handleClick(tag)}
      className={`px-4 py-1 ${baseStyle} ${isActive ? "text-yellow-600" : ""}`}
    >
      {tag}
    </div>
  );
}

export default memo(CategoryTag);
