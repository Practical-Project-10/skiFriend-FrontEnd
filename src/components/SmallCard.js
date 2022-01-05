import React from "react";

import styled from 'styled-components';
import { Grid, Image, Text } from "../elements";
import arrow from "../assets/carpoolList/arrow_icon.svg";
import calendar from "../assets/carpoolList/calendar_icon.svg";
import clock from "../assets/carpoolList/clock_icon.svg";

const SmallCard = (props) => {
  const {notLogin} = props;

  const repuest = props.carpoolType === '카풀 요청'
  console.log(repuest)

  if(notLogin) {
    return (
      <NotLogin>
        최근 카풀 내역이 없어요!
      </NotLogin>
    )
  }

  return(
    <CarpoolCard repuest={repuest}>
      <Grid>
        <Grid>
          <Text bold size='12px' color={repuest? '#7281D1': '#6195CF'}>{props.carpoolType}</Text>
        </Grid>
        <Text bold size='16px'>{props.title}</Text>
        <Location>
          <Text bold size='12px'>{props.startLocation}</Text>
          <Image src={arrow} width='50px' height='10px'/>
          <Text bold size='12px' color={repuest? '#7281D1': '#6195CF'}>{props.endLocation}</Text>
        </Location>
        <Grid>
          <Small repuest={repuest} >
            <Image src={calendar} width='12px' height='15px'/>
            <Text size='12px'>{props.date}</Text>
          </Small>
          <Small repuest={repuest} width="61px">
            <Image src={clock} width='12px' height='15px'/>
            <Text size='12px'>{props.time}</Text>
          </Small>
        </Grid>
      </Grid>
    </CarpoolCard>
  )
}

const CarpoolCard = styled.div`
  width: 180px;
  height: 152px;
  padding: 12px 12px;
  background: ${(props) => (props.repuest ? "#D3DBEE" : "#D9E4EE")};
  border-radius: 15px;
`;

const Location = styled.div`
  width: 145px;
  height: 30px;
  margin: 7px 0;
  background: #FFF;
  border: 1px solid #6195CF;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Small = styled.div`
  width: ${props => props.width};
  height: 22px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #FFF;
`

const NotLogin = styled.div`
  width: 229px;
  height: 152px;
  padding: 12px 12px;
  background: #EDEDEE;
  border-radius: 10px;
  color: #474D56;
  font-weight: 700;
  font-size: 16px;
  opacity: 0.5;
  text-align: center;
  line-height: 124px;
`

export default SmallCard;