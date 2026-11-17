import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Mail, Lock, LogIn, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getRememberMe } from '../../utils/localStorage';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import DemoCredentials from '../../components/auth/DemoCredentials';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: getRememberMe(),
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await login(data.email, data.password, data.rememberMe);
      toast.success(`Welcome back, ${user.name}! 🎉`);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = async () => {
    setValue('email', 'pavan@eventora.com');
    setValue('password', 'Pavan@123');
    setValue('rememberMe', true);
    setLoading(true);
    try {
      const user = await login('pavan@eventora.com', 'Pavan@123', true);
      toast.success(`Welcome back, ${user.name}! 🎉`);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your Eventora account to continue managing your events."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <Input
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address',
            },
          })}
        />

        {/* Password */}
        <Input
          label="Password"
          icon={Lock}
          type="password"
          placeholder="Enter your password"
          showPasswordToggle
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        {/* Remember Me + Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-burgundy focus:ring-champagne/30 cursor-pointer"
              {...register('rememberMe')}
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-champagne-600 hover:text-champagne-700 hover:underline underline-offset-2 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          loading={loading}
          icon={LogIn}
          fullWidth
        >
          Sign In
        </Button>

        {/* Security note */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <Shield size={12} />
          <span>Protected by SHA-256 encryption</span>
        </div>
      </form>

      {/* Demo Credentials */}
      <DemoCredentials onUseDemo={handleUseDemo} loading={loading} />

      {/* Register Link */}
      <div className="mt-8 text-center animate-slide-up animation-delay-800">
        <p className="text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-burgundy hover:text-burgundy-600 hover:underline underline-offset-2 transition-colors inline-flex items-center gap-1"
          >
            Create Account
            <ArrowRight size={14} />
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
