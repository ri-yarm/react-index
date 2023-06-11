import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonPage = () => (
  <ContentLoader 
    speed={2}
    width={1300}
    height={400}
    viewBox="0 0 966 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="7" ry="7" width="288" height="400" /> 
    <rect x="309" y="6" rx="14" ry="14" width="261" height="33" /> 
    <rect x="323" y="74" rx="7" ry="7" width="114" height="28" /> 
    <rect x="318" y="131" rx="0" ry="0" width="285" height="12" /> 
    <rect x="318" y="150" rx="0" ry="0" width="285" height="12" /> 
    <rect x="317" y="173" rx="0" ry="0" width="285" height="12" /> 
    <rect x="318" y="194" rx="0" ry="0" width="285" height="12" /> 
    <rect x="318" y="218" rx="0" ry="0" width="285" height="12" /> 
    <rect x="319" y="241" rx="0" ry="0" width="285" height="12" /> 
    <rect x="318" y="263" rx="0" ry="0" width="285" height="12" /> 
    <rect x="323" y="286" rx="0" ry="0" width="285" height="12" /> 
    <rect x="448" y="316" rx="0" ry="0" width="160" height="13" /> 
    <rect x="304" y="370" rx="8" ry="8" width="296" height="27" />
  </ContentLoader>
)

export default SkeletonPage

