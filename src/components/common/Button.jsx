import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'btn-primary',
  gold: 'btn-gold',
  outline: 'btn-outline',
  ghost: 'text-gray-600 hover:text-burgundy hover:bg-burgundy/5 font-medium py-2.5 px-4 rounded-xl transition-all duration-200',
  danger: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg',
};

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={`
        ${variants[variant] || variants.primary}
        ${fullWidth ? 'w-full' : ''}
        inline-flex items-center justify-center gap-2 text-sm
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={18} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={18} />}
        </>
      )}
    </button>
  );
}
