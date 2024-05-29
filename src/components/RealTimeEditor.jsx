import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

function RealTimeEditor({ label, name, control, defaultValue = "" }) {
  return (
    <div className="mt-2">
      {label && <label className="mb-1">{label}</label>}

      <Controller
        name={name || "description"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinymceEditorAPIKey}
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins:
                "anchor autolink charmap codesample emoticons image link" +
                "lists media searchreplace table visualblocks wordcount checklist" +
                "mediaembed casechange export formatpainter pageembed linkchecker" +
                "a11ychecker tinymcespellchecker permanentpen powerpaste advtable" +
                "advcode editimage advtemplate mentions tinycomments tableofcontents" +
                "footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough |" +
                "link image media table mergetags | addcomment showcomments" +
                "| spellcheckdialog a11ycheck typography | align lineheight |" +
                "checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RealTimeEditor;
