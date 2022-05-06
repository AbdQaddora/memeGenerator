import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import downloadIcon from '../../images/download.png'
export default function MemeImage({ text_top, text_bottom, img, memeName }) {
    const photo = useRef(null);
    const output = useRef(null);
    const tackScreenShoot = () => {
        let div = photo.current;
        div.innerHtml = "";
        html2canvas(div, {
            allowTaint: true,
            useCORS: true
        }).then(
            function (canvas) {
                download(canvas)
            })
    }

    const download = (canvas) => {
        let link = document.createElement('a');
        link.download = memeName;
        link.href = canvas.toDataURL()
        link.click();
    }

    return (
        <>
            <div className="meme" ref={photo}>
                <h1 className="meme-text top">{text_top}</h1>
                <h1 className="meme-text bottom">{text_bottom}</h1>
                <img className="memeImg" src={img} />
            </div>

            <button onClick={() => tackScreenShoot()} className="download">Download meme
                <img src={downloadIcon} />
            </button>
            
            <div ref={output}></div>
        </>
    )
}
