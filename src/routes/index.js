import React from 'react';
import { Redirect } from 'react-router-dom';
// 투표
import Vote from '../pages/Vote/index';
import VoteForm from '../pages/VoteForm/index';

// 워드 클라우드
import WordCloud from '../pages/WordCloud/index';
import WordCloudForm from '../pages/WordCloudForm/index';

// 오버레이
import OverlayWordCloud from '../pages/Overlays/wordcloud';
import OverlayVote from '../pages/Overlays/vote';

// 로그인 페이지
import Login from '../pages/Login/index';

// 홈 페이지
import Home from '../pages/Home/index';

// 슬롯
import Slot from '../pages/Slot/index';
import SlotReady from '../pages/SlotReady/index';

// 매뉴얼
import ManualVote from '../pages/Manual/vote';
import ManualWordCloud from '../pages/Manual/wordcloud';

const authProtectedRoutes = [
  // 홈 화면
  { path: '/home', component: Home },
  { path: '/vote', component: Vote },
  { path: '/voteform', component: VoteForm },

  // 워드 클라우드
  { path: '/wordcloud', component: WordCloud },
  { path: '/wordcloudform', component: WordCloudForm },

  // 매뉴얼
  { path: '/manualVote', component: ManualVote },
  { path: '/manualWordCloud', component: ManualWordCloud },

  // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to="/home" /> },
];

// 레이아웃이 필요없는 페이지들
const noLayoutRoutes = [
  // Overlay
  { path: '/voteoverlay', component: OverlayVote },
  { path: '/wordcloudoverlay', component: OverlayWordCloud },
  { path: '/slot', component: Slot },
  { path: '/slotready', component: SlotReady },
];

// 로그인이 필요없는 페이지들
const publicRoutes = [
  // 로그인 페이지login button examples
  { path: '/login', component: Login },
];

export { authProtectedRoutes, noLayoutRoutes, publicRoutes };
