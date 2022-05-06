import React from 'react';
import './Meme.css';
import MemeImage from '../memeImage/MemeImage';
import newImage from "../../images/newImg.png";
export default function Form() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImg: "https://i.imgflip.com/23ls.jpg",
        memeName: "Disaster Girl"
    })

    const [memesData, setMemesData] = React.useState([]);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(res => {
                setMemesData(res.data.memes);
            });
    }, [])

    function newImgHandeller(e) {
        e.preventDefault();
        const { url, name } = memesData[Math.floor(Math.random() * memesData.length)];
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                randomImg: url,
                memeName: name
            }
        })
    }

    function handelChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        });
    }

    return (
        <main>
            <form className='form'>
                <input type="text" className='form-input' placeholder='top text' onChange={handelChange} name="topText"></input>
                <input type="text" className='form-input' placeholder='bottom text' onChange={handelChange} name="bottomText"></input>
                <button className='form-btn' onClick={newImgHandeller}>Get a new meme image <img src={newImage} /></button>
            </form>
            <MemeImage text_top={meme.topText} text_bottom={meme.bottomText} img={meme.randomImg} memeName={meme.memeName} />
        </main>
    );
}