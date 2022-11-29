import { useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";

const Editor = dynamic<EditorProps>(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);

interface IRichTextEditorProps {
  cb: (content: string) => void;
  initialContent?: string;
  error?: string;
}

const RichTextEditor = ({
  cb,
  initialContent,
  error,
}: IRichTextEditorProps) => {
  const [editorState, setEditorState] = useState(
    initialContent
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(initialContent))
        )
      : EditorState.createEmpty()
  );

  const onEditorStateChange = (state: EditorState) => {
    const currentContent = state.getCurrentContent();
    const raw = convertToRaw(currentContent);
    const stringifiedContent = JSON.stringify(raw);

    if (!currentContent.hasText()) cb("");
    else cb(stringifiedContent);
    setEditorState(state);
  };

  return (
    <>
      <Editor
        editorState={editorState}
        toolbar={{
          options: ["inline", "list", "textAlign", "remove"],
        }}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName={`${
          error ? "border-2 border-danger-900 rounded-lg" : ""
        }`}
      />
      {error && (
        <p className="relative -mt-[1rem] left-1/2 -translate-x-1/2 text-center text-danger-900 text-sm w-full">
          {error}
        </p>
      )}
    </>
  );
};

export default RichTextEditor;
