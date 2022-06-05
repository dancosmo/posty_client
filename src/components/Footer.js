import linkedin from '../images/linkedin.gif';
import github from '../images/github.gif';
import styled from "styled-components";

//-----------<ComponentStyles>----------------
const StyledFooter = styled.div`
    margin-top: 15px;
    text-align: center;
    bottom: 0px;
    right: 0px;
    color: white;
    @media only screen and (max-width: 600px) {
        position: relative;
    }
`;
//-----------</ComponentStyles>---------------


const Footer = () => {
    
    return (
        <StyledFooter>I am developing this project using React.js, MongoDB, Express & Node.js. Here are my links: 
            <a style={{textDecoration:"none"}} href="https://linkedin.com/in/daniel-perez-55b8b2235"> <img style={{width:"30px", borderRadius:"10px",}} src={linkedin} alt="linkedin"></img></a>
            <a style={{textDecoration:"none"}} href="https://github.com/dancosmo"> <img style={{width:"30px", borderRadius:"10px",}} src={github} alt="linkedin"></img></a>
        </StyledFooter>
    );
}

export default Footer;