import styled from 'styled-components'
import Link from 'next/link';

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
    border-left:1px solid #bbb;
    min-width: 75px;

    &:first-child {
        border-left: none;
      }

`;

const HiddenItem = styled(ListItem)`
      @media(max-width: 1085px){
        display: none;
      }
`;



const DropDown = styled(ListItem)`
      @media(min-width: 1085px){
        display: none;
      }
      min-width: 120px;

      .DropdownContent{
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    
      }

      .DropdownContent a{
        color: black;
        padding: 0 16px;
        text-decoration: none;
        display: block;
        text-align: left;
      }

      .DropdownContent a:hover {background-color: #e5e5e5;}

      &:hover .DropdownContent {
        display: block;
      }
`;

const Tag = styled.a`
    display: block;
    color: white;
    text-align: center;
    padding: 0 16px;
    text-decoration: none;

    &:hover:not(.active){
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
      border-top:1px solid #bbb;
      min-width: 75px;
  
      &:first-child {
          border-top: none;
        }
      
`;


export function NavMobile(){
    return(
        <LisMob>
            <ListItemMob>
                <Link href="/tag/[tag]" as={'/tag/' + "Dinners"}>
                    <Tag >Dinners</Tag>
                </Link>
            </ListItemMob>
            <ListItemMob>
                <Link href="/tag/[tag]" as={'/tag/' + "Chicken"}>
                    <Tag >Chicken</Tag>
                </Link>
            </ListItemMob>
            <ListItemMob>
                <Link href="/tag/[tag]" as={'/tag/' + "Beef"}>
                    <Tag >Beef</Tag>
                </Link>
            </ListItemMob>
            <ListItemMob>
                <Link href="/tag/[tag]" as={'/tag/' + "Fish"}>
                    <Tag >Fish</Tag>
                </Link>
            </ListItemMob>
            <ListItemMob>
                <Link href="/tag/[tag]" as={'/tag/' + "Lamb"}>
                    <Tag >Lamb</Tag>
                </Link>
            </ListItemMob>
            <ListItemMob>
                <Link href="/tag/[tag]" as={'/tag/' + "Pasta"}>
                    <Tag >Pasta</Tag>
                </Link>
            </ListItemMob>
            <ListItemMob>
                <Link href="/tag/[tag]" as={'/tag/' + "Slow-Cooker"}>
                    <Tag >Slow Cooker</Tag>
                </Link>
            </ListItemMob>
        </LisMob>
    )
}



export default function NavButtons(){

    return(
        <List>
            <ListItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Dinners"}>
                    <Tag >Dinners</Tag>
                </Link>
            </ListItem>
            <HiddenItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Chicken"}>
                    <Tag >Chicken</Tag>
                </Link>
            </HiddenItem>
            <HiddenItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Beef"}>
                    <Tag >Beef</Tag>
                </Link>
            </HiddenItem>
            <HiddenItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Fish"}>
                    <Tag >Fish</Tag>
                </Link>
            </HiddenItem>
            <HiddenItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Lamb"}>
                    <Tag >Lamb</Tag>
                </Link>
            </HiddenItem>
            <ListItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Pasta"}>
                    <Tag >Pasta</Tag>
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Slow-Cooker"}>
                    <Tag >Slow Cooker</Tag>
                </Link>
            </ListItem>
            <DropDown>
                <Tag>Dropdown</Tag>
                <div className="DropdownContent">
                    <Link href="/tag/[tag]" as={'/tag/' + "Chicken"}>
                        <Tag >Chicken</Tag>
                    </Link>
                    <Link href="/tag/[tag]" as={'/tag/' + "Beef"}>
                        <Tag >Beef</Tag>
                    </Link>
                    <Link href="/tag/[tag]" as={'/tag/' + "Fish"}>
                        <Tag >Fish</Tag>
                    </Link>
                    <Link href="/tag/[tag]" as={'/tag/' + "Lamb"}>
                        <Tag >Lamb</Tag>
                    </Link>
                </div>
            </DropDown>
        </List>
    )
}