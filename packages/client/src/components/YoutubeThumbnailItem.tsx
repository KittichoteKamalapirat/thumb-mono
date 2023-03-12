import React from "react";

interface Props {
  thumbUrl: string;
  title: string;
}

const YoutubeThumbnailItem = ({ thumbUrl, title }: Props) => {
  return (
    <div className="w-60">
      <img src={thumbUrl} className="w-full rounded-md" />
      <p className="font-bold flex-wrap">{title}</p>
    </div>
  );
};
export default YoutubeThumbnailItem;
