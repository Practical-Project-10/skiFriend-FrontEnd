import React from "react";

import { history } from "../redux/ConfigStore";

import styled from "styled-components";
import { Grid, Text, Image } from "../elements";

import Heart from "../assets/freeBoard/heart.svg";
import Comment from "../assets/freeBoard/comment.svg";

const HotPost = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <Posts>
        <Grid is_flex padding="20px 0">
          <ResortName>{props.skiResort}</ResortName>
          <Grid is_flex justify="space-between" width="100%" gap="66px">
            <Grid width="80%">
              <Underline
                deco
                onClick={() =>
                  history.push(
                    `/freeboarddetail/${props.skiResort}/${props.postId}`
                  )
                }
              >
                {props.title}
              </Underline>
            </Grid>
            <Grid is_flex width="25%">
              <Grid is_flex margin="0 11px 0 0">
                <Image src={Heart} width="15px" height="13px" />
                <Text>{props.likeCnt}</Text>
              </Grid>
              <Grid is_flex>
                <Image src={Comment} width="15px" height="13px" />
                <Text>{props.commentCnt}</Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr />
      </Posts>
    </React.Fragment>
  );
};

const ResortName = styled.div`
  padding: 0 7px;
  margin-right: 11px;
  background: #6195cf;
  border-radius: 140px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  vertical-align: middle;
`;

const Posts = styled.div`
  &:last-child > hr {
    /* display: none; */
  }
`;

const Underline = styled.div`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default HotPost;
