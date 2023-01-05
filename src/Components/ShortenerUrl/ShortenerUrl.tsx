import axios from 'axios';
import { useEffect, useState } from 'react';
import style from "./ShortenerUrl.module.sass";
import CopyToClipboard from "react-copy-to-clipboard";

interface ShortenerUrlProps {
  setUrl: (arg: string) => void;
  setShortUrl: (arg: string) => void;
} 

function ShortenerUrl(props: ShortenerUrlProps) {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setInputValue(value);
    setValue("");
  }
  
  const [shortenLink, setShortenLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
      setShortenLink(res.data.result.full_short_link);
    } catch(err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if(loading) {
    return <p className="noData">Loading...</p>
  }
  if(error) {
    return <p className="noData">Something wne t wrong :(</p>
  }

  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <h1>URL <span>Shortener</span></h1>
        <div>
          <input
            type="text"
            placeholder="Paste a link to shorten it"
            value={value}
            onChange={e => {setValue(e.target.value); props.setUrl(e.target.value)}}  
          />
          <button onClick={handleClick}>shorten</button>
        </div>
      </div>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <CopyToClipboard
            text={shortenLink}
            onCopy={() => setCopied(true)}
          >
            <button className={copied ? "copied" : ""}>Copy to Clipboard</button>
          </CopyToClipboard>
        </div>
      )}
    </div>
  );
}

export default ShortenerUrl;