import { FC, useState } from "react";
import { useCreatePostCardTextPostMutation as createTextPostMutation } from "../../graphql/generated";

interface CreatePostCardProps {
  onPost?(): void
}

const CreatePostCard: FC<CreatePostCardProps> = ({ onPost }) => {
  const [text, setText] = useState('')
  const [createPost] = createTextPostMutation()

  async function onSubmit() {
    await createPost({
      variables: {
        input: {
          text,
        }
      }
    })
    setText('')
    onPost?.()
  }

  return <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5">
    <textarea className="block w-full bg-gray-700 rounded-lg text-gray-200 p-3" value={text} onChange={e => setText(e.target.value)} />
    <div className="flex justify-end pt-5">
      <button className="bg-blue-600 bg-opacity-25 text-blue-400 px-4 py-2 rounded-lg" onClick={onSubmit}>Posten</button>
    </div>
  </div>
}

export default CreatePostCard
