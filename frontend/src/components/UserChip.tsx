import { Chip } from "@nextui-org/react"



const UserChip = ({data,handlefuction}) => {
  return (
    <Chip color="primary" variant="shadow" onClose={handlefuction} className="p-2">
        {data.name}
    </Chip>
  )
}
export default UserChip