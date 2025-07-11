import { memo, useState } from "react";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";

export const LinkStyled = styled(Link)(() => ({
  padding: 0,
  textDecoration: "none",
}));

const LongContentCell = ({
  content,
  maxLength = 100,
  noLink = false,
}: {
  content: any;
  maxLength: number;
  noLink?: Boolean;
  key?: number;
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

  const displayContent = showFullContent
    ? content
    : `${content.slice(0, maxLength)} `;

  if (noLink) {
    return (
      <>
        {displayContent}
        {content.length > maxLength && `...`}
      </>
    );
  }

  return (
    <>
      {displayContent}
      {content.length > maxLength &&
        (showFullContent ? (
          //  @ts-ignore
          <LinkStyled rel="noreferrer" onClick={() => toggleContent()}>
            <span>&nbsp; &#8592;</span>
          </LinkStyled>
        ) : (
          //  @ts-ignore
          <Link rel="noreferrer" onClick={() => toggleContent()}>
            ...
          </Link>
        ))}
    </>
  );
};

//  @ts-ignore
export default memo(LongContentCell);
