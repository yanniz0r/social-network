import { FC, useMemo, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import {
  useCreatePostCardImagePostMutation as useCreateImagePostMutation,
  useCreatePostCardTextPostMutation as useCreateTextPostMutation,
} from "../../graphql/generated";
import Button from "../button";
import Card from "../card";
import PostTypeSelect from "../post-type-select";

interface CreatePostCardProps {
  onPost?(): void;
}

const CreatePostCard: FC<CreatePostCardProps> = ({ onPost }) => {
  const placeholder = useMemo(() => {
    const placeholders = [
      "Wie geht es Dir?",
      "Woran denkst du gerade?",
      "Wie war dein Tag?",
      "Was wünscht du Dir?",
      'Was ist deine "Unpopular Opinion"?',
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  }, []);
  const [postType, setPostType] = useState<"text" | "image">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [createImagePost] = useCreateImagePostMutation();
  const [createTextPost] = useCreateTextPostMutation();

  async function onSubmit() {
    if (postType === "text") {
      await createTextPost({
        variables: {
          input: {
            text,
          },
        },
      });
    } else {
      await createImagePost({
        variables: {
          input: {
            text,
            file,
          },
        },
      });
    }
    setText("");
    onPost?.();
  }

  return (
    <Card className="p-5">
      <div className="mb-4">
        <PostTypeSelect value={postType} onChange={setPostType} />
      </div>
      <textarea
        placeholder={placeholder}
        className="block w-full dark:bg-slate-700 bg-slate-100 rounded-lg text-slate-700 dark:text-slate-200 p-3"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {postType === "image" && (
        <div className="mt-4">
          <input
            type="file"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            className="bg-slate-700 rounded-full"
          />
        </div>
      )}
      <div className="flex justify-end pt-5">
        <Button iconStart={<FaPaperPlane />} onClick={onSubmit}>
          Posten
        </Button>
      </div>
    </Card>
  );
};

export default CreatePostCard;
