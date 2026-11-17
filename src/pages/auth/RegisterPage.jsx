import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  User, Mail, Phone, Lock, UserPlus, ArrowLeft, CheckCircle2, Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPasswordStrength } from '../../utils/helpers';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const password = watch('password');
  const strength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      toast.success('Account created successfully! 🎉 Please sign in.');
      navigate('/login', { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Eventora and start creating extraordinary events today."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <Input
          label="Full Name"
          icon={User}
          placeholder="Enter your full name"
          error={errors.name?.message}
          {...register('name', {
            required: 'Full name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
            maxLength: { value: 50, message: 'Name must not exceed 50 characters' },
          })}
        />

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

        {/* Phone */}
        <Input
          label="Phone Number"
          icon={Phone}
          type="tel"
          placeholder="+91 98765 43210"
          error={errors.phone?.message}
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[+]?[\d\s\-()]{10,15}$/,
              message: 'Please enter a valid phone number',
            },
          })}
        />

        {/* Password */}
        <div>
          <Input
            label="Password"
            icon={Lock}
            type="password"
            placeholder="Create a strong password"
            showPasswordToggle
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                message: 'Must include uppercase, lowercase, number & special character',
              },
            })}
          />
          {/* Password Strength Bar */}
          {password && (
            <div className="mt-2 space-y-1 animate-slide-down">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                  style={{ width: strength.width }}
                />
              </div>
              <p className="text-xs text-gray-500 ml-1">
                Password strength:{' '}
                <span className={`font-semibold ${
                  strength.score <= 2 ? 'text-red-500' :
                  strength.score <= 3 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {strength.label}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          icon={Lock}
          type="password"
          placeholder="Re-enter your password"
          showPasswordToggle
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (val) => val === password || 'Passwords do not match',
          })}
        />

        {/* Terms */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-burgundy focus:ring-champagne/30 cursor-pointer"
              {...register('terms', {
                required: 'You must accept the terms and conditions',
              })}
            />
            <span className="text-sm text-gray-600 leading-relaxed">
              I agree to the{' '}
              <span className="font-medium text-burgundy hover:underline cursor-pointer">
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="font-medium text-burgundy hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </label>
          {errors.terms && (
            <p className="text-xs text-red-500 mt-1 ml-7">{errors.terms.message}</p>
          )}
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          loading={loading}
          icon={UserPlus}
          fullWidth
          className="mt-2"
        >
          Create Account
        </Button>

        {/* Security note */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <Shield size={12} />
          <span>Your data is encrypted and secure</span>
        </div>
      </form>

      {/* Login Link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-burgundy hover:text-burgundy-600 hover:underline underline-offset-2 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
