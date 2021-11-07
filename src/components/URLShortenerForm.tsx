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
  async function copyURl() {
    
  }

  return (
    // <Box pos="relative" zIndex="2" backgroundColor="#f7f7f7" padding="6" textColor="black" borderRadius="5px" boxShadow="dark-lg">
    //   <form onSubmit={handleSubmit}>
    //     <InputGroup borderColor="black" textColor="black" >
    //       <Input
    //         onChange={(e: any) => setDestination(e.target.value)}
    //         placeholder="https://example.com"
    //       />
    //       <Button type="submit">CREATE</Button>
    //     </InputGroup>
    //   </form>
    //   {shortUrl && (
    //     <a href={`/${shortUrl?.shortId}`}>
    //       {window.location.origin}/{shortUrl?.shortId}
    //     </a>
    //   )}
    // </Box>
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
              // onSubmit={handleSubmit}
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
