import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../redux/modules/profile";
import { imageActions } from "../redux/modules/image";
import { userActions } from "../redux/modules/user";

import styled from "styled-components";
import { Grid, Image, Text, Input, Button } from "../elements/index";
import defaultIMG from "../assets/myPage/profilePicture.png";
import shield from "../assets/myPage/profile_shield.svg";


const ProfileWrite = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const preview = useSelector(state => state.image.preview);const user_profile = useSelector(state => state.profile.user_profile);
  console.log(user_profile);

  const pfImgFile = useRef();
  const vImgFile = useRef();

  const emptyFile = new File([""], "empty");
  const deleteFile = new File(["delete"], "delete");

  const username = props.match.params.username;
  const is_edit = username? true: false;

  // const [vacSelect, setVacSelect] = useState(false);
  const [profile, setProfile] = useState(
    {
      nickname: user_profile.nickname,
      profileImg: emptyFile,
      gender: is_edit? user_profile.gender: '',
      ageRange: is_edit? user_profile.ageRange: '',
      career: is_edit? user_profile.career: '',
      selfIntro: is_edit? user_profile.selfIntro: '',
      phoneNum: user_profile.phoneNum,
      vacImg: emptyFile,
    }
  );
  const {
    nickname,
    profileImg,
    gender,
    ageRange,
    career,
    selfIntro,
    phoneNum,
    vacImg,
  } = profile;

  useEffect(() => {
    if(is_edit && user_profile.gender === null) {
      window.alert('프로필 정보가 없어요! 우선 프로필 등록을 해주세요!');
      history.goback();

      return null;
    }


    if(is_edit) {
      dispatch(imageActions.setPreview(user_profile.profileImg))

    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile(
      {
        ...profile,
        [name]: value,
      }
    );
  };

  const handleClick = (e) => {
    const {name} = e.target;

    if (name === "nickname") {
      if(nickname !== '') {
        console.log("성공");
        console.log(nickname)
        dispatch(userActions.isNicknameDB(nickname));
      } else {
        window.alert('닉네임을 입력해주세요.')
      }
    };
  }

  const selectFile = () => {
    const reader = new FileReader();
    const profileImgFile = pfImgFile.current.files[0];
    const vacImgFile = vImgFile.current.files[0];
    const selectedFild = vacImgFile !== emptyFile;
    console.log(profileImgFile)
    console.log(vacImgFile)

    if(profileImgFile) {
      reader.readAsDataURL(profileImgFile);

      reader.onloadend = () => {
        dispatch(imageActions.setPreview(reader.result));
      };

      setProfile(
        {
          ...profile,
          profileImg: profileImgFile,
        }
      );
    };

    if(vacImgFile) {
      console.log('vasine2222')
      setProfile(
        {
          ...profile,
          vacImg: vacImgFile,
        }
      )
      // if(selectedFild) {
      //   console.log('vasine')
      //   setVacSelect(true);
      // }
    };
  };

  const deleteImg = (e) => {
    const {id} = e.target;
    console.log(e.target)
    console.log(e.target.id)
    if(id === 'deleteProfile') {
      setProfile(
        {
          ...profile,
          profileImg: deleteFile
        }
      );

      dispatch(imageActions.deletePreview());
    };

    if(id === 'deleteVac') {
      setProfile(
        {
          ...profile,
          vacImg: deleteFile
        }
      );
    };
  }
  
  const addProfile = () => {
    dispatch(profileActions.addProfileDB(profile));
  };

  const editProfile = () => {
    dispatch(profileActions.editProfileDB(profile));
  };

  const deleteUser = () => {
    dispatch(userActions.deleteUserInfoDB());
  }

  const logout = () => {
    dispatch(userActions.logout());
  }
  console.log(profile);
  return (
    <React.Fragment>
      <Grid phoneSize position='relative'>
        <Grid width="150px" height='182px' margin='40px auto 9px'  position='relative'>
          <Image width="150px" height="150px" size='cover' radius="50%" padding='0 0 9px' src={preview? preview: defaultIMG}/>
          <ProfileLabel htmlFor="profile">사진 추가하기</ProfileLabel>
          <input id="profile" type="file" onChange={selectFile} ref={pfImgFile} style={{display:'none'}}/>
          <DeletePic id='deleteProfile' onClick={deleteImg}>X</DeletePic>
        </Grid>
        <Grid margin='70px 0 0'>
          <Grid width='100%' display='flex' direction='column' gap='40px' margin='0 0 63px'>
            <Grid width="100%">
              <Input dupButton label='닉네임' buttonText='중복확인' type="text" size='12px' _name='nickname' placeholder='닉네임을 입력해주세요.' _value={nickname} _onClick={handleClick} _onChange={handleChange}/>
            </Grid>

            <Grid width="100%">
              <Text size='12px'>자기소개</Text>
              <Select name='gender' value={gender} onChange={handleChange}>
                <option >선택</option>
                <option value='남'>남자</option>
                <option value='여'>여자</option>
              </Select>
            </Grid>

            <Grid width="100%">
              <Text size='12px'>나이</Text>
              <Select name='ageRange' value={ageRange} onChange={handleChange}>
                <option>선택</option>
                <option value='10대'>10대</option>
                <option value='20대'>20대</option>
                <option value='30대'>30대</option>
                <option value='40대이상'>40대 이상</option>
              </Select>
            </Grid>

            <Grid width="100%">
              <Text size='12px'>스키 / 스노우보드 경력</Text>
              <Select name='career' value={career} onChange={handleChange}>
                <option>선택</option>
                <option value='초보'>초보</option>
                <option value='1~3년'>1~3년</option>
                <option value='3~5년'>3~5년</option>
                <option value='5년 이상'>5년 이상</option>
              </Select>
            </Grid>

            <Grid width="100%">
              <Text size='12px'>자기소개</Text>
              <Textarea name='selfIntro' value={selfIntro} placeholder="내용을 입력해주세요" onChange={handleChange}/>
            </Grid>

            <Grid width="100%">
              <Input label='전화번호' type="text" _disabled _name='phoneNum' _value={phoneNum} _onChange={handleChange}/>
            </Grid>

            <Grid width="100%">
              <Text size='12px'>비밀번호</Text>
              <Button 
                height='47px' padding='14px 0' color='#474D56' bg='#B5CCE5'
                _onClick={() => history.push(`/profilewrite/${username}/pwdchange`)}
              >비밀번호 변경</Button>
            </Grid>
          </Grid>

          <Grid width='100%' margin='0 0 63px'>
            <VacPic htmlFor="vac" > {/* add={vacSelect} */}
              <div className="vac">
                <Image src={shield} width='19px' height='22px'/>
                백신 인증 사진 추가하기
              </div>
            </VacPic>
            <input id="vac" type="file" onChange={selectFile} ref={vImgFile} style={{display:'none'}}/>

            {/* <Button _name='deleteVac' _onClick={deleteImg}>사진 삭제</Button> */}
          </Grid>
        </Grid>

        <Grid display='flex' direction='column' gap='16px'>
          <Button height='61px' _onClick={logout}>로그아웃</Button>
          <Button height='61px' color='#474D56' bg='#E2B9B9' _onClick={deleteUser}>회원탈퇴</Button>
        </Grid>

        <Grid align="center">
          <Button width="100px" padding="7px" margin="25px auto" _onClick={is_edit? editProfile: addProfile}>
            {is_edit? '수정 완료': '작성 완료'}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const ProfileLabel = styled.label`
  width: 125px;
  height: 30px;
  padding: 6px 16px;
  background: #FFF;
  border: 2px solid #6195CF;
  box-sizing: border-box;
  border-radius: 80px;
  font-size: 14px;
  color: #474D56;
  text-align: center;
  line-height: 14px;
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: auto;
`

const DeletePic = styled.div`
  width: 18px;
  height: 18px;
  color: #FFF;
  text-align: center;
  border-radius: 999px;
  background: #a6a9ad;
  position: absolute;
  top: 3px;
  right: 3px;
  cursor: pointer;

  &:hover {
    background: red;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  height: 116px;
  padding: 18px 12px;
  border: 1px solid #6195CF;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  resize: none;
`

const Select = styled.select`
  width: 100%;
  padding: 14px 8px;
  border-radius: 6px;
  border: 1px solid #474D56;
`

const VacPic = styled.label`
  display: block;
  width: 100%;
  height: 61px;
  background: #FFFFFF;
  border: 1px solid #6195CF;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 16px;
  color: #474D56;
  line-height: 60px; 
  text-align: center;
  position: relative;

  & > .vac {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &::before {
    content: "";
    width: ${(props) => (props.add ? "100%" : "")};
    height: ${(props) => (props.add ? "100%" : "")};
    border-radius: ${(props) => (props.add ? "8px" : "")};
    background: ${(props) => (props.add ? "rgba(0,0,0,0.5)" : "")};
    position: ${(props) => (props.add ? "absolute" : "")};
    top: ${(props) => (props.add ? 0 : "")};
    left: ${(props) => (props.add ? 0 : "")};
  }
`

export default ProfileWrite;
