import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader 
  speed={2}
  width={476}
  height={124}
  viewBox="0 0 476 124"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
  {...props}
>
  <rect x="26" y="66" rx="3" ry="3" width="88" height="6" /> 
  <rect x="23" y="81" rx="3" ry="3" width="96" height="37" /> 
  <circle cx="68" cy="22" r="39" />
</ContentLoader>
)

export default Skeleton;

