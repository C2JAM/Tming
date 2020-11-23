import React from 'react';

const Language = {
  // english
  en: 0,
  // korean
  ko: 1,
};

const sentences = {
  // 원하는 문자열 여기에 저장하면 됩니다.
  // 메인 타이틀
  main_upper_title: [
    'Make your broadcast more fun',
    '당신의 방송을 더욱 재밌게',
  ],

  // 로그아웃 메세지
  logout_alert: [
    'After logging out from the Twitch homepage, close the app and run it again!',
    '트위치 홈페이지에서 로그아웃을 한 후 어플을 종료하고 다시 실행시켜 주세요!',
  ],

  // 새로고침 메세지
  if_dont_work: [
    "If the function doesn't work, click Refresh Button! (refresh button on the top right)  ",
    '만약 기능이 작동하지 않을땐 새로고침을 눌러보세요!(우측 상단 새로고침 버튼)  ',
  ],

  // 투표 안내 메세지

  info_about_voting: [
    'When the vote begins, the viewer can enter "!vote [item]", "!vote [item name]" to participate in the vote. ex) "!vote 1," "!vote chicken"',
    '투표가 시작되면 시청자는 "!투표 [항목숫자]", "!투표 [항목이름]"을 입력하여 투표에 참여 할 수 있습니다. ex) "!투표 1", "!투표 치킨"',
  ],

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
    'Easily set up a variety of viewer engagement content such as viewer engagement surveys and chat analysis.',
    '시청자 참여 설문, 채팅 분석 등 다양한 시청자 참여 컨텐츠를 손쉽게 설정해보세요.',
  ],
  login_description_2: [
    'With Tming, you can create a richer broadcast.',
    'Tming과 함께라면 더욱 풍성한 방송을 만들 수 있습니다.',
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

  // VoteForm 화면
  start_voting: ['Start voting', '투표 시작'],
  end_voting: ['End voting', '투표 종료'],
  vote_apply_slot: ['Apply to broadcast screen', '방송화면에 적용'],
  voteform_placeholder: [
    'Please enter your voting item',
    '투표 항목을 입력후 엔터를 누르세요!',
  ],
  vote_end_alert: ['Voting end', '투표 종료'],
  vote_apply_to_slot_alert: [
    'Successfully applied to broadcast screen',
    '방송화면에 적용 되었습니다',
  ],
  vote_already_exist_alert: [
    'Voting is already exist. Please end voting',
    '투표가 이미 진행중입니다. 진행중인 투표를 종료해주세요',
  ],
  voted_user_1: ['voted at', '님이'],
  voted_user_2: ['', '번에 투표하셨습니다.'],
  vote_has_empty: [
    'Blank spaces cannot be voting items.',
    '빈 칸은 투표 항목이 될 수 없습니다.',
  ],

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

  // 설명서 화면
  manual_item_1: ['How to Use Voting', '투표 이용하기'],
  manual_item_2: ['How to Use WordCloud', '워드클라우드 이용하기'],
  manual_vote_1_1: [
    '1. Press the button to start voting (but not if voting is already in progress).',
    '1. 해당 버튼을 누르면 투표가 시작됩니다.(단, 이미 투표가 진행중인 경우에는 투표를 시작할 수 없습니다)',
  ],
  manual_vote_1_2: [
    '2. You can set the vote you want.',
    '2. 원하는 투표 항목을 설정 할 수 있습니다.',
  ],
  manual_vote_1_3: [
    '3. You can set the language you want.',
    '3. 원하는 언어를 설정할 수 있습니다.',
  ],
  manual_vote_1_4: [
    '4. You can view your own Twitch chat room.',
    '4. 자신의 트위치 채팅방을 볼 수 있습니다.',
  ],
  manual_vote_2_1: [
    '1. You can check when and where the people who voted voted.',
    '1. 투표 한 사람들이 언제, 어디에 투표했는지 확인 할 수 있습니다.',
  ],
  manual_vote_2_2: [
    '2. Overlay Select the shape of the vote you want to float.',
    '2. 오버레이 띄우기 원하는 투표의 모양을 선택 할 수 있습니다.',
  ],
  manual_vote_2_3: [
    '3. You can hide your current vote.',
    '3. 현재 투표를 감출 수 있습니다.',
  ],
  manual_vote_2_4: [
    '4. Show everyone who has voted in window 1.',
    '4. 현재 투표한 모든 사람들을 1번 창에 보여줍니다.',
  ],
  manual_vote_2_5: [
    '5. Show voting items. Click on each item to see who voted for that item.',
    '5. 투표 항목들을 보여줍니다. 각 항목들을 클릭하면 해당 항목에 투표한 사람들을 확인 할 수 있습니다.',
  ],
  manual_vote_2_6: [
    '6. End the voting. Press the Apply Slot button to apply the current vote to the slot.',
    '6. 투표를 종료합니다. 슬롯 적용 버튼을 누르면 현재 투표가 슬롯에 적용됩니다.',
  ],
  manual_vote_2_7: [
    '7. You can view your own Twitch chat room.',
    '7. 자신의 트위치 채팅방을 볼 수 있습니다.',
  ],
  manual_wordcloud_1_title: ['WordCloud setting', '워드클라우드 설정'],
  manual_wordcloud_1_1: [
    '1. You can resize the letters in WordCloud. You can specify the units in which the chat is saved and managed.',
    '1. 워드클라우드의 글자 크기를 조정할 수 있습니다. 채팅이 저장되고 관리되는 단위를 지정 할 수 있습니다.',
  ],
  manual_wordcloud_1_2: [
    '2. You can apply the settings you want. Apply the word cloud to the slot.',
    '2. 원하는 설정을 적용 할 수 있습니다. 워드클라우드를 슬롯에 적용시킵니다.',
  ],
  manual_wordcloud_1_3: [
    '3. You can check your twitch chat room.',
    '3. 자신의 트위치 채팅방을 확인 할 수 있습니다.',
  ],

  // Tooltips
  bar_tooltip: ['Bar chart', '막대형 차트'],
  pie_tooltip: ['Pie chart', '파이형 차트'],
  hide_tooltip: ['Hide voting', '투표 숨기기'],
  show_tooltip: ['Show voting', '투표 보기'],
  see_all_tooltip: ['View all voted users', '투표한 모든 유저 보기'],
  getLastVote: ['View last voting history', '지난 투표 보기'],
  backgroundColor: ['Make background color darker', '배경색 어둡게 만들기'],
};

export function convert() {
  // 로컬스토리지를 통해 언어 설정 관리
  const localLanguage = window.localStorage.getItem('lang');

  const index = Language[localLanguage];

  const ret = sentences.keys().forEach(value => {
    ret[value] = sentences[value][index];
  });

  return ret;
}

export class LangProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.LangKey,
    };
  }

  render() {
    const { key } = this.state;
    return <>{convert()[key]}</>;
  }
}
