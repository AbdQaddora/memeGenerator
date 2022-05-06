import './Nav.css';
import TrollFace from '../../images/TrollFace.png'
export default function Nav(){
    return(
        <nav>
            <img src={TrollFace} />
            <h3>Meme Generator</h3>
        </nav>
    );
}