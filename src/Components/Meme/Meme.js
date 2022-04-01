import React from 'react';
import './Meme.css';
export default function Form() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImg: "https://i.imgflip.com/23ls.jpg"
    })

    const [memesData, setMemesData] = React.useState([]);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setMemesData(res.data.memes);
                console.log(memesData);
            })
    }, [])
    function newImgHandeller(e) {
        e.preventDefault();
        const { url } = memesData[Math.floor(Math.random() * memesData.length)];
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                randomImg: url
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
                <button className='form-btn' onClick={newImgHandeller}>Get a new meme image <img src="./images/newImg.png" /></button>
            </form>
            <div className="meme">
                <h1 className="meme-text top">{meme.topText}</h1>
                <h1 className="meme-text bottom">{meme.bottomText}</h1>
                <img className="memeImg" src={meme.randomImg} />
            </div>
        </main>
    );
}