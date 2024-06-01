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
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
    maxHeight: 600,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
};

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    label: string;
    text: string;
};

export const NewModal: FC<ModalProps> = ({ isOpen, onClose, label, text }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpen}>
                <Box sx={style}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ wordWrap: 'break-word' }}>{label}</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, mb: 2 }}>
                        <Typography variant="body1">{text}</Typography>
                    </Box>
                    <Button onClick={onClose} variant="contained" color="primary" sx={{ alignSelf: 'center' }}>
                        OK
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};