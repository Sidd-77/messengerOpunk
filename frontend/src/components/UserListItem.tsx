import { Avatar, Button } from "@nextui-org/react"

const UserListItem = ({data, handlefuction}) => {
  return (
    <div className="flex items-center gap-2 bg-gray-900 rounded-2xl p-2 cursor-pointer" onClick={handlefuction}>
        <Avatar src={data.picture} />
        {data.name}
    </div>
  )
}
export default UserListItem