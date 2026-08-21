/**
 * Иконки AI-сервисов в блоке «AI RECOMMENDS LUMINAR».
 * В оригинале это инлайновые SVG; здесь — узнаваемые монохромные эквиваленты.
 */
type Props = { name: string; size?: number; className?: string };

export function AiServiceIcon({ name, size = 18, className }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'ChatGPT':
      return (
        <svg {...common}>
          <path
            d="M12 3.2a4.1 4.1 0 0 1 3.6 2.1 4.1 4.1 0 0 1 3 6.1 4.1 4.1 0 0 1-3.6 6.3A4.1 4.1 0 0 1 12 20.8a4.1 4.1 0 0 1-3.6-2.1 4.1 4.1 0 0 1-3-6.1 4.1 4.1 0 0 1 3.6-6.3A4.1 4.1 0 0 1 12 3.2Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M12 8.4v7.2M8.9 10.2 15.1 13.8M15.1 10.2 8.9 13.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case 'DeepSeek':
      return (
        <svg {...common}>
          <path
            d="M4 13.5c2.4 3.6 5.1 5.4 8 5.4 3.7 0 6.4-2.4 6.4-5.8 0-2.6-1.6-4.4-3.8-4.4-1.7 0-2.9 1-2.9 2.4 0 1.2.8 2 2 2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="17.6" cy="6.4" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'Claude':
      return (
        <svg {...common}>
          <path
            d="m6.3 16.4 3.2-8.1c.3-.7.7-1 1.3-1h2.4c.6 0 1 .3 1.3 1l3.2 8.1c.2.6-.1 1-.7 1h-1.4c-.5 0-.8-.2-1-.7l-.6-1.6h-4l-.6 1.6c-.2.5-.5.7-1 .7H7c-.6 0-.9-.4-.7-1Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'Grok':
      return (
        <svg {...common}>
          <path d="M5 19 19 5M9.5 19 19 9.5M5 13.5 13.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'Perplexity':
    default:
      return (
        <svg {...common}>
          <path d="M12 4v16M12 8.5 6.5 4.6v6.1h11V4.6L12 8.5ZM12 15.5l-5.5 3.9v-6.1h11v6.1L12 15.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      );
  }
}
