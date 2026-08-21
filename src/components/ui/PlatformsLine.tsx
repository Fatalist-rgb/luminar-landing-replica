import { AppleIcon, WindowsIcon, IosIcon, AndroidIcon, WebIcon } from './PlatformIcons';

type Props = { className?: string };

/**
 * Строка «Luminar on Desktop  , tablet and mobile   . Soon on Web.»
 * с инлайновыми иконками платформ — как под hero-видео оригинала.
 */
export function PlatformsLine({ className = '' }: Props) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-[6px] gap-y-[4px] text-[14px] text-white/80 md:text-[16px] ${className}`}
    >
      <span>Luminar on Desktop</span>
      <AppleIcon className="text-[#CCCDCC]" size={18} />
      <WindowsIcon className="text-[#CCCDCC]" size={18} />
      <span>, tablet and mobile</span>
      <IosIcon className="text-[#CCCDCC]" size={18} />
      <AndroidIcon className="text-[#CCCDCC]" size={18} />
      <WebIcon className="text-[#CCCDCC]" size={18} />
      <span>. Soon on Web.</span>
    </p>
  );
}
