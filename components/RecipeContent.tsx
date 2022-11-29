import { useState } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";

const Editor = dynamic<EditorProps>(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);

const RecipeContent = ({ content }: { content: string }) => {
  const [editorState, setEditorState] = useState(
    content
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      : EditorState.createEmpty()
  );

  return (
    <Editor
      editorClassName="clean-rich-text"
      editorState={editorState}
      toolbarHidden
      readOnly
    />
  );
};

export default RecipeContent;
