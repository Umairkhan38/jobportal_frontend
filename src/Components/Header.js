import { Box, styled } from '@mui/material'
import React from 'react'
import headerImage from '../images/jobbg.jpg';
import SearchInputEl from './SearchInputEl';
import WorkIcon from '@mui/icons-material/Work';


const Header = () => {

    const StyleHeader = styled(Box)(({ theme }) => (
        {
            display: "flex",
            justifyContent: 'center',
            flexDirection:"column",
            alignItems:"center",
            backgroundImage:`radial-gradient( rgba(0, 0, 0, -0.104), rgba(0, 0, 0, 0.75)),url(${headerImage}) `,
            height: '350px', /* You must set a specified height */
            backgroundPosition: 'center', /* Center the image */
            backgroundRepeat: 'no-repeat', /* Do not repeat the image */
            backgroundSize: 'cover' ,
            backgroundColor: theme.palette.secondary.main
        }
    ));

    return (
        <>
            <StyleHeader >
            <h1 style={{color:"white",textAlign:'center'}}><WorkIcon style={{fontSize:"2rem",height:'27px'}}/> Kickstart Your Future Today with us!</h1>
                <SearchInputEl />
            </StyleHeader>
        </>
    )
}



export default Header