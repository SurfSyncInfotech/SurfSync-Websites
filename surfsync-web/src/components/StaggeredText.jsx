import { Fragment } from "react";
import "./StaggeredText.css";

/* Text that staggers in by letter, word or line. Each piece rises, un-blurs and fades in a
   moment after the one before it. `delay` is when the first piece starts and `stagger` the
   gap between pieces, both in seconds. The real text stays in the page for screen readers
   and for search engines; the animated copy is hidden from them. */
function StaggeredText({
  text,
  by = "letter",
  delay = 0,
  stagger = 0.045,
  duration = 0.75,
  className = "",
}) {
  const lines = text.split("\n");
  let index = 0;
  const style = (i) => ({ "--i": i });

  const renderLine = (line) => {
    if (by === "line") {
      return (
        <span className="st-piece st-line" style={style(index++)}>
          {line}
        </span>
      );
    }
    return line.split(" ").map((word, w, words) => {
      const wordIndex = by === "word" ? index++ : null;
      return (
        <Fragment key={`${word}-${w}`}>
          <span className="st-word">
            {by === "word" ? (
              <span className="st-piece" style={style(wordIndex)}>
                {word}
              </span>
            ) : (
              [...word].map((char, c) => (
                <span className="st-piece" style={style(index++)} key={c}>
                  {char}
                </span>
              ))
            )}
          </span>
          {w < words.length - 1 ? " " : null}
        </Fragment>
      );
    });
  };

  return (
    <span
      className={`st ${className}`.trim()}
      style={{ "--st-delay": `${delay}s`, "--st-gap": `${stagger}s`, "--st-dur": `${duration}s` }}
    >
      <span className="st-sr">{text.replace(/\n/g, " ")}</span>
      <span className="st-anim" aria-hidden="true">
        {lines.map((line, l) => (
          <span className="st-row" key={l}>
            {renderLine(line)}
          </span>
        ))}
      </span>
    </span>
  );
}

export default StaggeredText;
