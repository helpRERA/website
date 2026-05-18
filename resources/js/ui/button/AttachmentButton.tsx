import { useRouter } from 'next/router';
import React from 'react'
import AttachSolid from '../icons/AttachSolid';
import PencilSolid from '../icons/PencilSolid';

interface Props {
  link?: string;
  onClick?: () => unknown;
}

export default function AttachmentButton({ link, onClick }: Props) {

  const router = useRouter()

  const handleClick = () => {
    if (link != null) {
      router.push(link)
    }
    if (onClick != null) {
      onClick()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 bg-accent-dark text-white
        transition ease-in duration-200 text-center text-base font-semibold
        rounded-[100%] shadow focus:ring-2 focus:ring-offset-1 focus:ring-accent-dark"
    >
      <AttachSolid />
    </button>
  )
}
