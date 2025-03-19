'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type ImageFetcherProps = {
  src: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
};

const ImageFetcher = ({
  src,
  fallbackSrc,
  alt,
  width,
  height
}: ImageFetcherProps) => {
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc);

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      onError={handleError}
      width={width}
      height={height}
    />
  );
};

export default ImageFetcher;
