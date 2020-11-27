import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

// actions
import { changeLanguage } from '../../store/actions';

// language
import { LangProvider } from '../Languages/languages';

// assets
import LogoImage from '../../assets/images/logo/tming_logo.png';

const animate = keyframes`
    0%, 11%, 12%, 100% {
        transform: scale(1, .05);
    }
    5%,
    10%, 
    16%, 
    95% {
        transform: scale(1, 1);
    }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  img {
    width: 45px;
  }

  .logo-eye__1,
  .logo-eye__2 {
    width: 4px;
    height: 8px;
    background-color: #37a5da;
    animation: ${animate} 5s infinite;
  }

  .logo-eye__1 {
    position: absolute;
    top: 15px;
    right: 18px;
  }

  .logo-eye__2 {
    position: absolute;
    top: 15px;
    right: 9px;
  }
`;

const Header = styled.header`
  display: flex;
  padding: 15px 10vw 15px 10vw;
  box-sizing: border-box;
  height: 100px;
  justify-content: space-between;
  background-color: #222831;
  align-items: center;
`;

const FlexItems = styled.div`
  display: flex;
  gap: 5vw;
  align-items: center;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #eeeeee;
  padding: 5px 15px;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

function Index({ lang: Lang, changeLanguage: changeLanguageDispatch }) {
  function onChangeLanguage(event) {
    const { value: nextLang } = event.target;
    changeLanguageDispatch(nextLang);
  }

  return (
    <>
      <Header>
        <FlexItems>
          <LogoWrapper>
            <Link to="/">
              <img src={LogoImage} alt="" />
              <div className="logo-eye__1" />
              <div className="logo-eye__2" />
            </Link>
          </LogoWrapper>

          <Link to="/vote">
            <Button type="button">
              <LangProvider LangKey="real_time_voting" />
            </Button>
          </Link>
          <Link to="/wordcloud">
            <Button type="button">
              <LangProvider LangKey="wordcloud" />
            </Button>
          </Link>
        </FlexItems>

        <div className="header-item">
          <select
            name="languages"
            id="language"
            value={Lang}
            onChange={onChangeLanguage}
          >
            {/*  eslint-disable-next-line */}
            <option value="en">🇺🇸 English</option>
            {/*  eslint-disable-next-line */}
            <option value="ko">🇰🇷 Korean</option>
          </select>
        </div>
      </Header>
    </>
  );
}

Index.propTypes = {
  lang: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    lang: state.lang,
  };
};

const mapDispatchToProps = { changeLanguage };

export default connect(mapStateToProps, mapDispatchToProps)(Index);
