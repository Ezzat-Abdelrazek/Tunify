import { NavLink } from "react-router-dom";

import { AiOutlineHome } from "react-icons/ai";
import { RiUserLocationLine } from "react-icons/ri";
import { FcMusic } from "react-icons/fc";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import styled from "styled-components";

const Sidebar = () => {
  const mobileViewportWidth = 960;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(undefined);

  const menuClickHandler = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  const NavLinks = () => (
    <StyledList>
      <li>
        <StyledLink to="/" end onClick={menuClickHandler}>
          <AiOutlineHome />
          Discover
        </StyledLink>
      </li>
      <li>
        <StyledLink to="/around-you" end onClick={menuClickHandler}>
          <RiUserLocationLine />
          Around You
        </StyledLink>
      </li>
    </StyledList>
  );

  return (
    <>
      <StyledBox mobileViewportWidth={mobileViewportWidth}>
        <StyledTypographyBox>
          <StyledH1>
            <FcMusic />
            <span>Tun</span>
            ify
          </StyledH1>
          <StyledH2>
            Your Melodic Oasis: <span>Unleashing</span> the Power of Music
          </StyledH2>
        </StyledTypographyBox>
        <StyledNav>
          <NavLinks />
        </StyledNav>
      </StyledBox>

      <StyledMenuOpenCloseBtn
        mobileViewportWidth={mobileViewportWidth}
        onClick={menuClickHandler}
      >
        {mobileMenuOpen ? <IoMdClose /> : <HiOutlineMenu />}
      </StyledMenuOpenCloseBtn>

      <AnimatePresence>
        {mobileMenuOpen && (
          <StyledMobileBox
            mobileViewportWidth={mobileViewportWidth}
            mobileMenuOpen={mobileMenuOpen}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <StyledTypographyBox>
              <StyledH1>
                <FcMusic />
                <span>Tun</span>
                ify
              </StyledH1>
              <StyledH2>
                Your Melodic Oasis: <span>Unleashing</span> the Power of Music
              </StyledH2>
            </StyledTypographyBox>
            <StyledNav>
              <NavLinks />
            </StyledNav>
          </StyledMobileBox>
        )}
      </AnimatePresence>
    </>
  );
};

//STYLED COMPONENTS

const StyledTypographyBox = styled.div`
  line-height: 1.2;
`;

const StyledBox = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  min-height: 100vh;

  padding: 4rem 2rem;
  text-align: center;

  @media screen and (max-width: ${(props) => props.mobileViewportWidth}px) {
    display: none;
  }
`;

const StyledMobileBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  min-height: 100vh;

  padding: 4rem 2rem;
  text-align: center;

  position: fixed;
  z-index: 10000000;

  @media screen and (min-width: ${(props) => props.mobileViewportWidth}px) {
    display: none;
  }
`;

const StyledH1 = styled.h1`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  font-size: 4rem;

  span {
    color: #e90064;
  }
`;
const StyledH2 = styled.h2`
  font-size: 1.8rem;

  span {
    color: #e90064;
  }
`;
const StyledNav = styled.nav`
  align-self: flex-start;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  list-style: none;
`;

const StyledLink = styled(NavLink)`
  color: #fff;

  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-size: 2.2rem;

  transition: all 0.3s;

  &:hover {
    color: #e90064;
  }

  &.active {
    color: #e90064;
  }
`;

const StyledMenuOpenCloseBtn = styled.button`
  background: none;

  border: none;

  color: #fff;

  cursor: pointer;

  position: fixed;
  font-size: 3rem;
  top: 1rem;
  right: 1rem;
  z-index: 1000000;

  @media screen and (min-width: ${(props) => props.mobileViewportWidth}px) {
    display: none;
  }
`;

export default Sidebar;
