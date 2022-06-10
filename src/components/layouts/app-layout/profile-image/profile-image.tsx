import Image from 'next/image';

interface ProfileImageProps {
  width: string | number;
  height: string | number;
}

const ProfileImage = ({ width, height }: ProfileImageProps) => {
  const src =
    'https://www.clipartmax.com/png/middle/364-3643767_about-brent-kovacs-user-profile-placeholder.png';

  return (
    <Image
      src={src}
      alt="Profile Image"
      loader={() => src}
      width={width}
      height={height}
      className="rounded-full"
    />
  );
};

export default ProfileImage;
