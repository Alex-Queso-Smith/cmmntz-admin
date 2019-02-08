import React from 'react';
import VoteButtonRowOne from '../components/voting/VoteButtonRowOne';
import VoteButtonRowTwo from '../components/voting/VoteButtonRowTwo';

export const ImageSelector = (type, baseImageUrl) => {

  if (type.includes('blank')) {
    return ''
  } else {
    return `${baseImageUrl}/images/icons-v2/${type}.png`
  }
}

export const ImageSelectorTemp = (filterList, notFilterList, type) => {
  if (filterList.includes(`${type}_percent`)) {
    return `/assets/${type}-selected`
  } else if (notFilterList.includes(`${type}_percent`)) {
    return  `/assets/${type}-unselected`
  } else {
    return `/assets/${type}`
  }
}

export const AlwaysVisible = [
  "like",
  "indifferent",
  "dislike"
]

export const RowOneVoteTypes = [
  ["top", "Top"],
  ["love", "Love"],
  ["like_a_lot", "Like A Lot"],
  ["like", "Like"],
  ["indifferent", "Indifferent"],
  ["dislike", "Dislike"],
  ["dislike_a_lot", "Dislike A Lot"],
  ["trash", "Trash"],
  ["warn", "Warn"]
]

export const RowTwoVoteTypes = [
  ["smart", "Smart"],
  ["funny", "Funny"],
  ["happy", "Happy"],
  ["shocked", "Shocked"],
  ["sad", "Sad"],
  ["boring", "Boring"],
  ["angry", "Angry"]
]

const OpacityHandler = (percent) => {
  if (percent == 0) {
    return "exclude-translucent"
  } else {
    return ""
  }
}

export const RowOneVoteButtons = (object) => {
  return RowOneVoteTypes.map((type) => {
    var { showVotes, commentId } = object.props;
    var { votePercents, selectedVotes, voteCounts, totalInteractions } = object.state
    var visibility, percentage, voteFraction;

    var image = ImageSelector(type[0], object.props.globalSettings.baseImageUrl)
    var opacity = OpacityHandler(votePercents[type[0]])

    if ( showVotes ) {
      voteFraction = `${voteCounts[type[0]]}/${totalInteractions}`
      percentage = `${votePercents[type[0]]}%`
    } else {
      if (!AlwaysVisible.includes(type[0])) {
        visibility = 'visibility-hidden'
      }
    }

    return(
      <VoteButtonRowOne
        key={`${commentId}_${type[0]}`}
        className={`margin-top-10px`}
        name={type[0]}
        label={type[1]}
        visibility={visibility}
        percentage={percentage}
        voteFraction={voteFraction}
        opacity={opacity}
        image={image}
        />
    )
  })
}

export const RowTwoVoteButtons = (object) => {
  return RowTwoVoteTypes.map((type) => {
    var { showVotes, commentId } = object.props;
    var { votePercents, selectedVotes, voteCounts, totalInteractions } = object.state;
    var visibility, percentage, voteFraction;

    var image = ImageSelector(type[0], object.props.globalSettings.baseImageUrl);
    var opacity = OpacityHandler(votePercents[type[0]])

    if ( showVotes ) {
      voteFraction = `${voteCounts[type[0]]}/${totalInteractions}`
      percentage = `${votePercents[type[0]]}%`
    } else {
      visibility = 'visibility-hidden'
    }

    return(
      <VoteButtonRowTwo
        key={`${commentId}_${type[0]}`}
        className={`margin-top-10px`}
        name={type[0]}
        label={type[1]}
        visibility={visibility}
        percentage={percentage}
        opacity={opacity}
        voteFraction={voteFraction}
        image={image}
        />
    )
  })
}
