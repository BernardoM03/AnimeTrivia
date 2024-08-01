import React from "react";

export default function Meme() {
    const [memeData, setMemeData] = React.useState([])
    const [meme, setMeme] = React.useState({
        topText: "top text",
        bottomText: "bottom text",
        imgUrl: "http://i.imgflip.com/1bij.jpg"
    })

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then((res) => res.json())
        .then((data) => setMemeData(data))
    }, [])

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    console.log(meme);

    function getImage(){
        const imgArray = memeData.data.memes
        const randomNum = Math.floor(Math.random() * imgArray.length)
        setMeme(prevState => ({...prevState, imgUrl: imgArray[randomNum].url}))
    }

    return(
        <div className="meme">
            <div className="meme--form">
                <label className="meme--label">Top Text
                    <input 
                        className="meme--input" 
                        type="text" 
                        name="topText" 
                        placeholder="Top Text" 
                        onChange={handleChange}
                    />
                </label>
                <label className="meme--label">Bottom Text
                    <input 
                        className="meme--input" 
                        type="text" 
                        name="bottomText"
                        placeholder="Bottom Text"
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button className="meme--btn" type="button" onClick={getImage}>Choose New Image 🖼</button>
            <div className="meme--container">
                <img className="meme--img" alt={meme.imgUrl} src={meme.imgUrl} />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </div>
    );
}