import { Popover } from "@headlessui/react"
import { FC } from "react"
import { FaEllipsisV, FaFlag, FaTrash } from "react-icons/fa"
import { usePostOptionsDeletePostMutation } from "../../graphql/generated"

interface PostOptionsProps {
  postID: string
}

const PostOptions: FC<PostOptionsProps> = (props) => {
  const [deletePostMutation] = usePostOptionsDeletePostMutation()

  async function deletePost() {
    await deletePostMutation({
      variables: {
        id: props.postID,
      }
    })
  }

  return <Popover className="relative">
    <Popover.Button className="text-slate-500">
      <FaEllipsisV />
    </Popover.Button>
    <Popover.Panel className="absolute z-10 right-0">
      <ul className="bg-slate-700 shadow-lg rounded-lg divide-y divide-slate-800">
        <li>
          <button className="text-slate-100 px-4 py-2 flex items-center gap-3" onClick={deletePost}>
            <FaTrash className="text-xs" />
            Löschen
          </button>  
        </li>
        <li>
          <button className="text-slate-100 px-4 py-2 flex items-center gap-3">
            <FaFlag className="text-xs" />
            Melden
          </button>
        </li>
      </ul>
    </Popover.Panel>
  </Popover>
}

export default PostOptions
