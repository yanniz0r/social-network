import { FC, useState } from "react";
import { useCreatePostCardImagePostMutation as useCreateImagePostMutation, useCreatePostCardTextPostMutation as useCreateTextPostMutation } from "../../graphql/generated";
import PostTypeSelect from "../post-type-select";

interface CreatePostCardProps {
  onPost?(): void;
}

const CreatePostCard: FC<CreatePostCardProps> = ({ onPost }) => {
  const [postType, setPostType] = useState<'text' | 'image'>('text')
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [createImagePost] = useCreateImagePostMutation();
  const [createTextPost] = useCreateTextPostMutation();

  async function onSubmit() {
    if (postType === 'text') {
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
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5">
      <div className="mb-4">
        <PostTypeSelect value={postType} onChange={setPostType} />
      </div>
      <textarea
        className="block w-full bg-gray-700 rounded-lg text-gray-200 p-3"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {postType === 'image' &&
        <div className="mt-4">
          <input type="file" onChange={e => e.target.files && setFile(e.target.files[0])} className="bg-gray-700 rounded-full" />
        </div>
      }
      <div className="flex justify-end pt-5">
        <button
          className="bg-blue-600 bg-opacity-25 text-blue-400 px-4 py-2 rounded-lg"
          onClick={onSubmit}
        >
          Posten
        </button>
      </div>
    </div>
  );
};

export default CreatePostCard;
