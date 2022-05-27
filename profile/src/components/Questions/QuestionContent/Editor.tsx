import React from "react";
import MDEditor from "@uiw/react-md-editor";

interface EditorProp {
  source: string;
  isPreview?: boolean;
  onSourceChange?: (val: string | undefined) => void;
  height?: "small" | "medium" | "large";
}

const Editor = ({
  source,
  isPreview = false,
  onSourceChange,
  height = "small",
}: EditorProp) => {
  let editorHeight = 100;
  if (height === "medium") {
    editorHeight = 140;
  } else if (height === "large") {
    editorHeight = 180;
  }
  return isPreview ? (
    <MDEditor.Markdown source={source} style={{ padding: "15px" }} />
  ) : (
    <MDEditor
      hideToolbar
      preview="edit"
      value={source}
      onChange={onSourceChange}
      height={editorHeight}
    />
  );
};

export default Editor;
