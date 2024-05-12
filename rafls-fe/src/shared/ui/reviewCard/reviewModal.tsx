import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import {FC} from "react"
import {Button, FormGroup, Typography} from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    maxHeight: 600
}

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    text: string
}

export const NewModal: FC<ModalProps> = ({isOpen, onClose, text}) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
            slotProps={{
                backdrop: {
                    timeout: 500,
                }
            }}
        >
            <Fade in={isOpen}>
                <Box sx={style}>
                    <FormGroup
                        sx={{display: 'flex', flexDirection: 'column', height: 350, flexWrap: 'nowrap'}}>
                    <div>
                        <Typography variant="body1" sx={{height: 200}}>{text}</Typography>
                    </div>
                    <Button onClick={onClose} alig variant="contained" color="warning">
                        OK
                    </Button>
                </FormGroup>
                </Box>
            </Fade>
        </Modal>
    )
}
