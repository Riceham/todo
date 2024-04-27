"use client";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        src="/images/logos/logo-1.svg"
        width={40}
        height={40}
        alt="logo"
        priority
      />
    </div>
  );
};

export default Logo;
