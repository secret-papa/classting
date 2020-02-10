import React, { useState } from 'react';
import classnames from 'classnames/bind';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LayerPopUp from '../../ui/LayerPopUp'
import VoteUpdator from '../../container/vote/VoteUpdator';
import { deleteVoteAction } from '../../../redux/vote';
import style from './VoteListItem.scss';


import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteSharp from '@material-ui/icons/DeleteSharp';
import CreateSharp from '@material-ui/icons/CreateSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HowToVote from '@material-ui/icons/HowToVote';
import ZoomIn from '@material-ui/icons/ZoomIn'

const cx = classnames.bind(style);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  id,
  title,
  startTime,
  endTime,
  writer,
  voteItems,
  isViewerWrite,
  isViewerVote,
  inProgress,
  voteService
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

  const handleClickUpdate = () => {
    openUpdateVotePopUp();
  }

  const handleClickDelete = async () => {
    const voteId = await voteService.deleteVoteById(id);
    dispatch(deleteVoteAction(voteId));
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={title}
        subheader={inProgress ? '진행 중' : '종료 됨'}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          기간: {startTime.split("T").join(' ')} ~ {endTime.split("T").join(' ')}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          생성자: {writer.email}
        </Typography>
      </CardContent>
      {
        isViewerWrite &&
        <CardActions disableSpacing>
          <IconButton onClick={handleClickUpdate}>
            <CreateSharp />
          </IconButton>
          <IconButton onClick={handleClickDelete}>
            <DeleteSharp />
          </IconButton>
          <Link to={`/vote/${id}`} style={{marginLeft: 'auto'}} >
            <IconButton>
              {isViewerVote ? <ZoomIn /> : <HowToVote />}
            </IconButton>
          </Link>
        </CardActions>
      }

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