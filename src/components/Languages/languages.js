import React from 'react';
import PropTypes from 'prop-types';

const Language = {
  // english
  en: 0,
  // korean
  ko: 1,
};

const sentences = {
  // Home 화면
  real_time_voting: ['Real time voting', '실시간 투표'],
  my_top_clips: ['My Top Clips', '내 인기 클립'],
  views: ['views', '조회수'],
  my_activity: ['My Activity', '내 활동'],
  landing_box_1_title: ['All functions in one', '모든 기능을 하나로'],
  landing_box_1_description: [
    'Create a variety of viewer-participating content with just one Tming desktop app without installing Chrome plug-ins, Twitch plug-ins, and more.',
    '크롬 플러그인, 트위치 플러그인 등의 설치 없이 TMing 데스크탑 앱 하나만으로 다양한 시청자 참여 컨텐츠를 만들어보세요.',
  ],
  landing_box_2_title: [
    'Highly compatible with broadcasting programs',
    '방송 프로그램과 뛰어난 호환',
  ],
  landing_box_2_description: [
    'It is fully compatible with existing broadcasting environment such as OBS and Xsplit.',
    'OBS, Xsplit등 기존 방송 환경에 완벽하게 호환 가능합니다.',
  ],
  landing_box_3_title: [
    'Settings and results that are automatically backed up',
    '자동으로 백업되는 세팅과 결과',
  ],
  landing_box_3_description: [
    'Stop setting up new settings and backups each time, and all of the audience participation surveys and participation result data set in Tming are automatically saved to your PC.',
    '매번 새로 세팅하고 백업하는 건 그만, TMing에 설정해둔 시청자 참여 설문, 참여 결과 데이터 등은 모두 PC에 자동으로 저장됩니다.',
  ],
  banned_users_title: ['Banned Users', '밴 유저들'],
  moderators_title: ['Managers', '매니저들'],
  slot_copy: ['Broadcast overlay URL', '방송 오버레이 URL'],
  update_alert: [
    'you can update new version! Click here!',
    '새로운 버전으로 업데이트 할수있습니다! 여기를 클릭해보세요!',
  ],
  copy_alert: ['link copied', '링크 복사됨'],

  // Login 화면
  login_title: [
    'Easy to broadcast, Enjoyable for viewers',
    '방송을 편하게, 시청자는 즐겁게',
  ],
  login_description_1: [
    'Easily set up a variety of viewer engagement content such as viewer engagement surveys.',
    '시청자 참여 설문으로 다양한 시청자의 참여를 유도해보세요.',
  ],
  login_description_2: [
    'With Tming, you can create a richer broadcast.',
    '트밍과 함께라면 더욱 풍성한 방송을 만들 수 있습니다.',
  ],
  login_description_3: ['What is Tming?', '트밍이란?'],
  login_twitch: ['Log in with Twitch', '트위치로 로그인'],

  // Header
  setting_up_voting: ['Generating voting', '투표 생성'],
  current_voting: ['Current voting', '현재 투표'],
  wordcloud: ['WordCloud', '워드클라우드'],
  wordcloud_setting: ['Generating WordCloud', '워드클라우드 시작하기'],
  how_to_use: ['How to use', '설명서'],

  // WordCloudForm 화면
  wordcloudform_title: ['WordCloud', '워드클라우드'],
  wordcloudform_sub_title: [
    'Change option after apply defualt option set',
    '기본옵션값을 적용해 본 후 옵션값을 바꿔보세요!',
  ],
  wordcloudform_setting1: ['in/max font size', '최소/최대 글자크기'],
  wordcloudform_setting2: ['Update time (second)', '업데이트 시간 (초)'],
  wordcloudform_setting3: ['Black color background', '검은색 배경'],
  wordcloudform_apply_option: ['Apply option', '옵션 적용'],
  wordcloudform_apply_slot: ['Apply to broadcast screen', '방송화면에 적용'],

  // Vote 화면
  copy_slot: ['Copy slot', '슬롯 복사'],
  vote_part: ['Voting participants', '투표 참여자'],
  new_item: ['Add new item', '새 항목 추가'],

  // Guide 화면
  home_guide_1_1: ['Hello', '안녕하세요.'],
  home_guide_1_2: ['Welcome to Tming!', 'Tming에 오신것을 환영합니다!'],
  home_guide_2: [
    "Let me show you how to use Tming's real-time voting function.",
    'Tming의 실시간 투표 기능을 어떻게 사용하는지 알려드리겠습니다.',
  ],
  home_guide_3: [
    'Please enter the real-time voting settings in the menu.',
    '메뉴의 실시간 투표의 투표 설정을 들어가주세요.',
  ],
  voteform_guide_1_1: [
    'Please enter the voting items.',
    '투표 항목들을 입력해주세요.',
  ],
  voteform_guide_1_2: [
    'You can enter multiple items.',
    '항목은 여러개를 입력 할 수 있습니다.',
  ],
  voteform_guide_2: [
    'Press button to start voting.',
    '버튼을 눌러 투표를 시작하세요.',
  ],
  vote_guide_1_1: [
    'The real-time voting has now been created.',
    '이제 실시간 투표가 생성 되었습니다.',
  ],
  vote_guide_1_2: [
    'This window lets you see the voting tally.',
    '이 창에서는 투표 집계 상황을 확인할 수 있습니다.',
  ],
  vote_guide_2: [
    'Overlays for floating on OBS and XSplit are provided as slot functions.',
    'OBS와 XSplit에 띄우기 위한 오버레이는 슬롯 기능으로 제공합니다.',
  ],
  vote_guide_3: [
    'Please register the address "http://127.0.0.1:5000/slot" as an overlay to OBS or XSplit.',
    '"http://127.0.0.1:5000/slot"의 주소를 OBS나 XSplit에 오버레이로 등록해주세요.',
  ],
};

export function convert() {
  // 로컬스토리지를 통해 언어 설정 관리
  const localLanguage = window.localStorage.getItem('lang');

  const index = Language[localLanguage];

  const ret = {};
  Object.keys(sentences).forEach(value => {
    ret[value] = sentences[value][index];
  });

  return ret;
}

export function LangProvider({ LangKey }) {
  return <>{convert()[LangKey]}</>;
}

LangProvider.propTypes = {
  LangKey: PropTypes.string.isRequired,
};
