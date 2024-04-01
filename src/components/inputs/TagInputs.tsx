import { useState } from "react";

type Props = {
  tags: Array<String>;
  setTags: Function;
};

function TagsInput({ tags, setTags }: Props) {
  function handleKeyDown(e: any) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTag(index: any) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div className="tags-input-container">
      {tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <i onClick={() => removeTag(index)} className="bx bxs-checkbox-minus">
          </i>
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className="tags-input"
        disabled
        placeholder="Participantes cargados"
      />
    </div>
  );
}

export default TagsInput;
