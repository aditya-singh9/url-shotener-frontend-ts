import axios from "axios";
import { useState, useRef, useEffect, CSSProperties } from "react";
import { SERVER_ENDPOINTS } from "../config";
import "./URLShortenerForm.css";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CopyToClipboard from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import PropagateLoader from "react-spinners/PropagateLoader";


function URLShortenerForm() {
  const [destination, setDestination] = useState();
  const divRef = useRef<HTMLAnchorElement>(null);
  const [loading, setloading] = useState(true);
  const [forks, setforks] = useState(0);
  const [stars, setstars] = useState(0);
  const [savedArr, setSavedArr] = useState<string[]>([""]);
  const [shortUrl, setShortUrl] = useState<{
    shortId: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShortUrl(null);
    const result = await axios
      .post(`${SERVER_ENDPOINTS}/api/url`, {
        destination,
      })
      .then((resp) => resp.data)
      .catch((err) => {
        toast.error("Please enter a valid url.");
      });

    setShortUrl(result);
    if(savedArr.length<5)
    shortUrl&&setSavedArr((oldArray: string[])=>[...oldArray, finalURL]);
    else
    shortUrl&&setSavedArr((oldArray: string[]) => {
      oldArray.shift();
      oldArray.pop();
      oldArray.push(finalURL);
      return oldArray;
    })
    localStorage.setItem("savedURLs", JSON.stringify(savedArr));
  }
  var finalURL = `${window.location.origin}/${shortUrl?.shortId}`;
  const text = () => {
    toast.success("Copied!");
  };

  const savedURLs = (savedArr.map(item => <a className="shortened" href={item} key={item} >{item} </a>))

  const getForksStarsCount = async () => {
    const { data } = await axios.get(`https://api.github.com/repos/aditya-singh9/url-shotener-frontend-ts`);
    setforks(data.forks_count);
    setstars(data.stargazers_count);
    setloading(false);
    setSavedArr(()=>localStorage.getItem("savedURLs")?JSON.parse(localStorage.getItem("savedURLs")||""):[""]);
  };
  useEffect(() => {
    getForksStarsCount();
  }, [])

  const override: CSSProperties = {
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    borderColor: "red",
  };

  if (!loading) {

    return (
      <>
        <div className="outer">
          <div>
            <Toaster />
          </div>


          <div className="head-div">
            <p className="head">
              Shorten <span>URLs</span>
            </p>
          </div>
          <div className="forks_stars_div">
            <div className="block_div">
              <a className="btn" href="https://github.com/aditya-singh9/url-shotener-frontend-ts" rel="noreferrer noopener" target="_blank" aria-label="Fork aditya-singh9/kekfinder on GitHub">
                <div className="block_divLeft">

                  <StarBorderIcon className="starbtn" /><p className="forks_stars_text">Star</p>
                </div>
              </a>
              <div className="black_pipe"> </div>
              <div className="block_divLeftNum">
                <p className="block_divLeftNumText">{stars}</p>
              </div>
            </div>
            <div className="block_div">
              <a className="btn" href="https://github.com/aditya-singh9/url-shotener-frontend-ts/fork" rel="noreferrer noopener" target="_blank" aria-label="Fork aditya-singh9/kekfinder on GitHub">
                <div className="block_divRight">

                  <svg className="fork_logo" viewBox="0 0 16 16" width="20" height="20" margin-top="2" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
                    </path>
                  </svg>
                  <p className="fork">Fork</p>

                </div>
              </a>
              <div className="black_pipe"> </div>
              <div className="block_divRightNum">
                <p>{forks}</p>
              </div>
            </div>

          </div>
          <div className="outer">
            <form className="form" onSubmit={handleSubmit}>
              <input
                className="input"
                placeholder="Enter a URL"
                onChange={(e: any) => setDestination(e.target.value)}
              />
              <button type="submit" className="button">
                Create!
              </button>
            </form>
          </div>

          {shortUrl && (
            <div className="link-div">
              <p className="link">
                <span>
                  <a
                    href={`/${shortUrl?.shortId}`}
                    target="_blank"
                    rel="noreferrer"
                    ref={divRef}
                  >
                    {window.location.origin}/{shortUrl?.shortId}
                  </a>
                </span>
              </p>
              <CopyToClipboard text={finalURL}>
                <ContentCopyRoundedIcon className="copyBtn" onClick={text} />
              </CopyToClipboard>
            </div>
          )}
          <div className="history">
            <p>Previously shortened URLs:</p>
            {savedURLs}
          </div>
          <div className="name-div">
            <p className="name">
              Crafted by
              <a
                href="https://www.adityasingh.xyz/"
                target="_blank"
                rel="noreferrer"
              >
                <span> Aditya</span>.
              </a>
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return ( 
       <PropagateLoader color="#0070f3" loading={loading} cssOverride={override} size={15} />
    );
  }

}

export default URLShortenerForm;
