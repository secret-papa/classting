import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CreateSharp from '@material-ui/icons/CreateSharp';
import { red } from '@material-ui/core/colors';
import DeleteSharp from '@material-ui/icons/DeleteSharp';
import IconButton from '@material-ui/core/IconButton';
import HowToVote from '@material-ui/icons/HowToVote';
import Typography from '@material-ui/core/Typography';
import ZoomIn from '@material-ui/icons/ZoomIn';

import LayerPopUp from '../../ui/LayerPopUp'
import VoteUpdator from '../../container/vote/VoteUpdator';
import { deleteVoteAction } from '../../../redux/vote';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function VoteListItem({
  endTime,
  id,
  inProgress,
  isViewerVote,
  isViewerWrite,
  startTime,
  title,
  voteItems,
  voteService,
  writer
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [updateVotePopUpStatus, setUpdateVotePopUpStatus] = useState(false);

  const closeUpdateVotePopUp = () => {
    setUpdateVotePopUpStatus(false);
  }
  const openUpdateVotePopUp = () => {
    setUpdateVotePopUpStatus(true);
  }

  const handleClickDelete = async () => {
    const voteId = await voteService.deleteVoteById(id);
    dispatch(deleteVoteAction(voteId));
  }

  const handleClickUpdate = () => {
    openUpdateVotePopUp();
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={title}
        subheader={
          inProgress === 0 ?
          '종료 됨'
          :
            inProgress === -1 ?
            '대기 중'
            :
            '진행 중'
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          기간: {startTime.split("T").join(' ')} ~ {endTime.split("T").join(' ')}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          생성자: {writer.email}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {
          isViewerWrite &&
          <>
            <IconButton onClick={handleClickUpdate}>
              <CreateSharp />
            </IconButton>
            <IconButton onClick={handleClickDelete}>
              <DeleteSharp />
            </IconButton>
          </>
        }
        {
          inProgress !== -1 ?
            inProgress === 0 && isViewerVote ?
            <Link to={`/vote/${id}`} style={{ marginLeft: 'auto' }} >
              <IconButton>
                <ZoomIn />
              </IconButton>
            </Link>
            : 
            inProgress === 1 &&
            <Link to={`/vote/${id}`} style={{ marginLeft: 'auto' }} >
              <IconButton>
                { isViewerVote ? <ZoomIn/> : <HowToVote/> }
              </IconButton>
            </Link>
          :
            ''
        }
      </CardActions>
      {
        updateVotePopUpStatus &&
        <LayerPopUp>
          <VoteUpdator
            voteId={id}
            title={title}
            startTime={startTime}
            endTime={endTime}
            voteItems={voteItems}
            voteService={voteService}
            closeForm={closeUpdateVotePopUp}
          />
        </LayerPopUp>
      }
    </Card>
  )
}

export default VoteListItem;