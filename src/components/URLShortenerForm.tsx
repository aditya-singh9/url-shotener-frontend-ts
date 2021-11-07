// import { Input, Button, Box, InputGroup } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { SERVER_ENDPOINTS } from "../config";
import "./URLShortenerForm.css";

function URLShortenerForm() {
  const [destination, setDestination] = useState();
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
      .then((resp) => resp.data);

    setShortUrl(result);
  }

  return (
    <>
      <div className="outer">
        <div className="head-div">
          <p className="head">
            Shorten <span>URLs</span>
          </p>
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
        <div className="link-div">
          <p className="link">
            {shortUrl && (
              <a href={`/${shortUrl?.shortId}`} target="_blank">
                {window.location.origin}/{shortUrl?.shortId}
              </a>
            )}
          </p>
        </div>
        <div className="name-div">
          <p className="name">
            Crafted by
            <a href="https://github.com/aditya-singh9" target="_blank">
              <span> Aditya</span>.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default URLShortenerForm;
