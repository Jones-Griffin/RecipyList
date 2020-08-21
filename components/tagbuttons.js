import styled from 'styled-components'
import fire from '../config/fire-config';
import Link from 'next/link';

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    line-height: 57px;
    text-align: center;
    height: 57px;

`;

const ListItem = styled.li`
    float: left;
    border-right:1px solid #bbb;
    min-width: 75px;

    &:last-child {
        border-right: none;
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


export default function NavButtons(){

    return(
        <List>
            <ListItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Dinners"}>
                    <Tag >Dinners</Tag>
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Chicken"}>
                    <Tag >Chicken</Tag>
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Beef"}>
                    <Tag >Beef</Tag>
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Fish"}>
                    <Tag >Fish</Tag>
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Lamb"}>
                    <Tag >Lamb</Tag>
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/tag/[tag]" as={'/tag/' + "Pasta"}>
                    <Tag >Pasta</Tag>
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/tag/[tag]" as={'/tag/' + "SlowCooker"}>
                    <Tag >Slow Cooker</Tag>
                </Link>
            </ListItem>
        </List>
    )
}