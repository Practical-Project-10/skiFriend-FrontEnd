import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../redux/modules/profile";
import { userActions } from "../redux/modules/user";
import { carpoolActions } from "../redux/modules/carpool";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import SmallCard from "../components/SmallCard";
import Header from "../components/Header";

import styled from "styled-components";
import { Grid, Button, Image, Text } from "../elements/index";
import basicProfile from "../assets/myPage/profilePicture.png";
import notLoginProfile from "../assets/myPage/profile_default_img.png";
import banner from "../assets/myPage/mypage_banner.png";

const MyPage = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("is_login");
  const is_profile = localStorage.getItem("is_profile");
  console.log(is_profile);
  const user_profile = useSelector((state) => state.profile.user_profile);
  const myCarpool = useSelector((state) => state.carpool.myList);
  console.log(user_profile);
  // console.log(user_profile.profileImg);

  React.useEffect(() => {
    if (!is_login) {
      return null;
    }
    dispatch(profileActions.getProfileDB());
    dispatch(carpoolActions.getMyCarpoolDB());
  }, []);

  return (
    //로그인 안 했을 때
    <Grid>
      <Header>마이페이지</Header>

      <Grid margin="0 0 70px 0" minHeight="calc( 100vh - 124px )">
        <Grid phoneSize>
          {!is_login ? (
            <Grid>
              <Grid display="flex" justify="space-between" margin="30px 0 22px">
                <Grid width="75px" height="75px">
                  <Image
                    width="75px"
                    height="75px"
                    size="cover"
                    radius="999px"
                    src={notLoginProfile}
                  />
                </Grid>

                <Grid padding="12px 0" margin="0 18px 0 0">
                  <Text bold size="18px" line>
                    로그인이 필요합니다.
                  </Text>
                </Grid>

                <Grid padding="6px 0 0">
                  <Grid
                    cursor
                    width="66px"
                    padding="5px 6px"
                    bg="#FFF"
                    radius="4px"
                    align="center"
                    _onClick={() => {
                      history.push("/login");
                    }}
                  >
                    <Text size="12px" color="#474D56">
                      로그인
                    </Text>
                  </Grid>
                </Grid>
              </Grid>

              <div
                style={{ border: "1px solid #adb6c1", margin: "0 0 22px" }}
              ></div>
            </Grid>
          ) : (
            // 로그인 했을 때
            <Grid>
              <Grid display="flex" justify="space-between" margin="30px 0 22px">
                <Grid width="75px" height="75px">
                  <Image
                    width="75px"
                    height="75px"
                    size="cover"
                    radius="999px"
                    src={
                      user_profile.profileImg === null
                        ? basicProfile
                        : user_profile.profileImg
                    }
                  />
                </Grid>

                <Grid width="179px" padding="12px 0" margin="0 18px 0 0">
                  <Text bold size="18px" line>
                    환영해요! {user_profile.nickname}님
                  </Text>
                  <Grid margin="10px 0 0">
                    <Small>
                      <Text bold size="12px" color="#FFF">
                        20대
                      </Text>
                    </Small>
                  </Grid>
                </Grid>

                {/* <Grid
                  cursor
                  width="66px"
                  padding="6px"
                  bg="#FFF"
                  radius="4px"
                  align="center"
                  _onClick={() => {
                    history.push("/profilewrite");
                  }}
                >
                  <Text size="12px" color="#474D56">
                    등록하기
                  </Text>
                </Grid> */}

                <Grid padding="6px 0 0">
                  {is_profile === true ? (
                    <Grid
                      cursor
                      width="66px"
                      padding="6px"
                      bg="#FFF"
                      radius="4px"
                      align="center"
                      _onClick={() => {
                        history.push(`/profilewrite/${user_profile.username}`);
                      }}
                    >
                      <Text size="12px" color="#474D56">
                        수정하기
                      </Text>
                    </Grid>
                  ) : (
                    <Grid
                      cursor
                      width="66px"
                      padding="6px"
                      bg="#FFF"
                      radius="4px"
                      align="center"
                      _onClick={() => {
                        history.push("/profilewrite");
                      }}
                    >
                      <Text size="12px" color="#474D56">
                        등록하기
                      </Text>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              <div style={{ border: "1px solid #adb6c1" }}></div>

              <Grid margin="22px 0 31px">
                <Text bold="800" size="12px" margin="0 0 8px 0">
                  자기소개
                </Text>
                <Text>스키와 커피를 즐길 줄 아는 남자</Text>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid
          height="800px"
          bg="#FFF"
          radius="22px 22px 0 0"
          padding="16px 16px 0"
        >
          <Grid cursor width="100%" height="143px">
            <Image src={banner} width="100%" height="100%" size="cover" />
            {/* 구글 폼으로 이동 */}
          </Grid>

          <Grid margin="25px 0 0">
            {is_login ? (
              <RowDiv>
                <Text bold size="12px">
                  내가 쓴 카풀
                </Text>
                <Swiper
                  className="scroll-container"
                  slidesPerView={2}
                  spaceBetween={10}
                  initialSlide={1}
                >
                  {myCarpool.map((l) => {
                    return (
                      <SwiperSlide>
                        <Grid key={l.createdAt} width="100%">
                          <SmallCard {...l} />
                        </Grid>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </RowDiv>
            ) : (
              <SmallCard notLogin />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Small = styled.div`
  width: 46px;
  height: 19px;
  background: #6195cf;
  border-radius: 140px;
  text-align: center;
  line-height: 18px;
`;

const RowDiv = styled.div`
  .scroll-container {
    height: 100%;
    display: flex;
    padding: 16px 0;
    margin-top: 25px;
    box-sizing: border-box;
  }
`;

export default MyPage;
