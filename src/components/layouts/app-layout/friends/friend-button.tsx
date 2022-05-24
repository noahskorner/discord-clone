import Link from 'next/link';
import { useRouter } from 'next/router';

interface FriendButtonProps {
  href: string;
  children: JSX.Element | string;
}

const FriendButton = ({ href, children }: FriendButtonProps) => {
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <span
        className={`${
          router.pathname === href
            ? 'bg-slate-600 font-semibold text-white'
            : 'text-slate-300 hover:bg-slate-600/20 hover:font-medium hover:text-white'
        } cursor-pointer rounded-md px-2 py-1 text-sm font-medium`}
      >
        {children}
      </span>
    </Link>
  );
};

export default FriendButton;
