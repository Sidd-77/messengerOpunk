import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Avatar} from "@nextui-org/react";


const Info = ({data}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className="bg-zinc-700 shadow-lg text-lg" onPress={onOpen}>Info</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-5 justify-center">
                <Avatar size="lg" src={data.picture}/>
              </ModalHeader>
              <ModalBody className="flex text-lg">
                <div>
                    Username : {data.name}
                </div>
                <div>
                    Mail : {data.email}
                </div>              
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default Info