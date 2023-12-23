import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";


const ChatBox = () => {
  return (
    <Card className="flex m-2 flex-grow">
      <CardHeader>
        Chat Name
      </CardHeader>
      <Divider/>
      <CardBody className=" overflow-y-auto">
        Messages
      </CardBody>
      <Divider/>
      <CardFooter>
        Text Input
      </CardFooter>
    </Card>
  )
}
export default ChatBox