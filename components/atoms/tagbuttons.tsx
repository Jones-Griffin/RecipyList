import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #333;
  line-height: 57px;
  text-align: center;
  height: 57px;
`;

const ListItem = styled.li`
  float: left;
  border-left: 1px solid #bbb;
  min-width: 75px;

  &:first-child {
    border-left: none;
  }
`;

const HiddenItem = styled(ListItem)`
  @media (max-width: 1085px) {
    display: none;
  }
`;

const DropDown = styled(ListItem)`
  @media (min-width: 1085px) {
    display: none;
  }
  min-width: 120px;

  .DropdownContent {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 120px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .DropdownContent a {
    color: black;
    padding: 0 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  .DropdownContent a:hover {
    background-color: #e5e5e5;
  }

  &:hover .DropdownContent {
    display: block;
  }
`;

const Tags = styled.a`
  display: block;
  color: white;
  text-align: center;
  padding: 0 16px;
  text-decoration: none;

  &:hover:not(.active) {
    background-color: #191716;
    cursor: pointer;
  }
`;

const LisMob = styled(List)`
  display: flex;
  flex-direction: column;
  height: auto;
`;

const ListItemMob = styled(ListItem)`
  width: 100%;

  border-left: none;
  border-top: 1px solid #bbb;
  min-width: 200px;

  &:first-child {
    border-top: none;
  }
`;

const navItems = ["Chicken", "Beef", "Fish", "Pork"];

export const NavMobile: FC = () => {
  return (
    <LisMob>
      <ListItemMob>
        <Link href="/tags/[tags]" as={"/tags/" + "Dinners"}>
          <Tags>Dinners</Tags>
        </Link>
      </ListItemMob>
      {navItems.map((item) => (
        <ListItemMob>
          <Link key={item} href="/tags/[tags]" as={"/tags/" + item}>
            <Tags>{item}</Tags>
          </Link>
        </ListItemMob>
      ))}
      <ListItemMob>
        <Link href="/tags/[tags]" as={"/tags/" + "Pasta"}>
          <Tags>Pasta</Tags>
        </Link>
      </ListItemMob>
      <ListItemMob>
        <Link href="/tags/" as={"/tags/"}>
          <Tags>More...</Tags>
        </Link>
      </ListItemMob>
    </LisMob>
  );
};

export const NavButtons: FC = () => {
  return (
    <List>
      <ListItem>
        <Link href="/tags/[tags]" as={"/tags/" + "Dinners"}>
          <Tags>Dinners</Tags>
        </Link>
      </ListItem>
      {navItems.map((item) => (
        <HiddenItem key={item}>
          <Link href="/tags/[tags]" as={"/tags/" + item}>
            <Tags>{item}</Tags>
          </Link>
        </HiddenItem>
      ))}
      <ListItem>
        <Link href="/tags/[tags]" as={"/tags/" + "Pasta"}>
          <Tags>Pasta</Tags>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/tags/" as={"/tags/"}>
          <Tags>More...</Tags>
        </Link>
      </ListItem>
      <DropDown>
        <Tags>Dropdown</Tags>
        <div className="DropdownContent">
          {navItems.map((item) => (
            <Link key={item} href="/tags/[tags]" as={"/tags/" + item}>
              <Tags>{item}</Tags>
            </Link>
          ))}
        </div>
      </DropDown>
    </List>
  );
};
