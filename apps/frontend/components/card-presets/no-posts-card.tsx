import { FC } from "react"
import { FaGhost } from "react-icons/fa"
import Button from "../button"
import Card from "../card"

interface NoPostsCardProps {
  name: string
}

const NoPostsCard: FC<NoPostsCardProps> = (props) => {
  return <Card className="p-10 flex flex-col gap-5 items-center justify-center">
    <FaGhost className="text-5xl text-slate-400" />
    <div>
      <h3 className="text-white text-xl text-center">
        Leer hier...
      </h3>
      <p className="text-slate-400 text-center">
        {props.name} hat noch keine
        Beiträge gepostet.
      </p>
    </div>
    <div className="flex justify-center">
      <Button>Nachricht senden</Button>
    </div>
  </Card>
}

export default NoPostsCard
