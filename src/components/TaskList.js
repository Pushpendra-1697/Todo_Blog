import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure, Text, Heading, Box } from '@chakra-ui/react';
import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteTask from './DeleteTask';

function TaskList({ tasks, onDeleteTask }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const statusColumns = ['Pending', 'In Progress', 'Completed', 'Deployed', 'Deferred'];

    return (
        <Box display={'grid'} gridTemplateColumns={'repeat(5,1fr)'} gap={'30px'}>
            {tasks.length > 0 && statusColumns.map((status) =>
                <Box key={status} display={'flex'} flexDirection={'column'} gap={'10px'} borderRadius={'7px'} boxShadow={'lg'}>
                    <Heading py={'10px'} color={'white'} background={status === "Pending" ? 'beige' : status === "In Progress" ? 'orange' : status === 'Completed' ? 'green' : status === 'Deployed' ? 'blue' : 'bisque'} fontSize={'23px'} borderTopRadius={'7px'} textAlign={'center'}>{status}</Heading>
                    <Box p={'10px'} display={'flex'} flexDirection={'column'} gap={'10px'}>
                        {tasks.filter((task) => task.status === status).map((task) =>
                            <Box key={task.id} display={'flex'} flexDirection={'column'} gap={'10px'} background={'beige'} p={'5px'} borderRadius={'3px'}>
                                <Box borderBottom={'1px solid black'} p={'5px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Heading as={'h3'} size={'23px'}>{task.title}</Heading>
                                    <Text background={'blue'} p={'2px 6px'} borderRadius={'2px'} color={'white'}>{task.priority}</Text>
                                </Box>
                                <Text>{task.description}</Text>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Text>@{task.assignee}</Text>
                                    <Box background={'blue'} p={'3px'} borderRadius={'2px'} color={'white'}>
                                        <BsThreeDotsVertical cursor={'pointer'} onClick={onOpen} />
                                    </Box>
                                </Box>

                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent background={'aliceblue'} borderRadius={'10px'} w={'150px'}>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Text cursor={'pointer'} borderBottom={'2px solid white'}>Edit</Text>
                                            <DeleteTask onDeleteTask={onDeleteTask} id={task.id} title={task.title} />
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>

                                <Text>Start Date: {task.startDate}</Text>
                                {(task.endDate && task.status === "Completed") && <Text>End Date: {task.endDate}</Text>}
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default TaskList;
