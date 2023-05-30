import React from "react"
import ContentLoader from "react-content-loader"

export const ProductSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={390}
    height={400}
    viewBox="0 0 390 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="24" ry="24" width="390" height="400" />
  </ContentLoader>
)