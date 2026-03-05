import "../styles/loader.css";

export default function Loader({ text = "Please wait while we are loading..." }) {
  return (
    <div className="loader-wrapper">
      <span className="loader"></span>
      <p className="loader-text">{text}</p>
    </div>
  );
}