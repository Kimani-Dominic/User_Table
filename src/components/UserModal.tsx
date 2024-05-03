import { FaRegEdit } from 'react-icons/fa'
import { UserForm } from './UserForm'
import { UserType } from '../store/useUsersStore'
import { IoMdAdd } from 'react-icons/io'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  IconButton,
  Button,
} from '@chakra-ui/react'

type UserModalPropsType = {
  user?: UserType
  isEditMode?: boolean
}

export const UserModal = ({ user, isEditMode }: UserModalPropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {isEditMode ? (
        <IconButton
          size={'xs'}
          title="Edit User"
          aria-label="edit"
          backgroundColor={'transparent'}
          onClick={onOpen}
          icon={
            <FaRegEdit
              size={'16px'}
              cursor={'pointer'}
              color="#1C84CA"
            />
          }
        />
      ) : (
        <Button
          width={'100%'}
          maxWidth={'150px'}
          colorScheme="blue"
          onClick={onOpen}
          leftIcon={<IoMdAdd size={'18px'} />}
          height={'35px'}
          fontSize={'14px'}
        >
          Add New User
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditMode ? 'Edit User' : 'Add New User'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <UserForm
              user={user}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
