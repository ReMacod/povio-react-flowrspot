import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import Brand from '../Brand'

import { dialogNames, closeDialog } from '../../reducers/Dialogs'

const { MAIN_MENU } = dialogNames

const useStyles = makeStyles(theme => ({
  dialogClose: {
    width: 50,
    position: 'absolute',
    top: 5,
    right: 15,
    color: theme.palette.gray.main,
  },
  dialogTitle: {
    padding: '5px 17px 20px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0 20',

    '& > button.MuiButton-root': {
      paddingLeft: '0 !important',

      '& > span.MuiButton-label': {
        justifyContent: 'flex-start',
      },
    },
  },
}))

const MainMenuDialog = ({ dispatch, dialogs, children }) => {
  const { dialogs: dialogsList } = dialogs
  const { isOpen } = dialogsList[MAIN_MENU]

  const onClose = () => dispatch(closeDialog({ dialogKey: MAIN_MENU }))

  const dialogClasses = useStyles()
  const { dialog, dialogClose, dialogTitle, dialogContent } = dialogClasses

  return (
    <Dialog
      className={dialog}
      fullScreen={true}
      maxWidth="sm"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <IconButton
        className={dialogClose}
        edge="start"
        color="inherit"
        onClick={onClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle id="responsive-dialog-title" className={dialogTitle}>
        <Brand onClick={onClose} />
      </DialogTitle>

      <DialogContent className={dialogContent}>{children}</DialogContent>
    </Dialog>
  )
}

const redux = [
  ({ dialogs }) => ({
    dialogs,
  }),
]

export default connect(...redux)(MainMenuDialog)
