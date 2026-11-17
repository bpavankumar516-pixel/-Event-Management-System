import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Lock, KeyRound, ArrowLeft, CheckCircle, Sparkles, LogIn, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPasswordStrength } from '../../utils/helpers';
import { getResetEmail } from '../../utils/localStorage';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const paramEmail = searchParams.get('email');
    const storedEmail = getResetEmail();
    const resolvedEmail = paramEmail || storedEmail;
    if (!resolvedEmail) {
      toast.error('No email found. Please start the forgot password process again.');
      navigate('/forgot-password', { replace: true });
      return;
    }
    setEmail(resolvedEmail);
  }, [searchParams, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { password: '', confirmPassword: '' } });

  const password = watch('password');
  const strength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await resetPassword(email, data.password);
      setResetSuccess(true);
      toast.success('Password reset successfully! 🔐');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <AuthLayout
      title={resetSuccess ? '' : 'Reset Password'}
      subtitle={resetSuccess ? '' : `Create a new password for ${email}`}
    >
      {!resetSuccess ? (
        <>
          {/* Icon */}
          <div className="flex justify-center mb-6 animate-scale-in">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-burgundy/10 to-champagne-50 flex items-center justify-center border border-burgundy/10">
              <KeyRound size={36} className="text-burgundy" />
            </div>
          </div>

          {/* Reset email badge */}
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy/5 border border-burgundy/10">
              <Lock size={14} className="text-burgundy" />
              <span className="text-sm text-burgundy font-medium">{email}</span>
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* New Password */}
            <div>
              <Input
                label="New Password"
                icon={Lock}
                type="password"
                placeholder="Enter new password"
                showPasswordToggle
                error={errors.password?.message}
                {...register('password', {
                  required: 'New password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                    message: 'Must include uppercase, lowercase, number & special character',
                  },
                })}
              />
              {password && (
                <div className="mt-2 space-y-1 animate-slide-down">
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 ml-1">
                    Strength:{' '}
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
              label="Confirm New Password"
              icon={Lock}
              type="password"
              placeholder="Re-enter new password"
              showPasswordToggle
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (val) => val === password || 'Passwords do not match',
              })}
            />

            <Button type="submit" loading={loading} icon={ShieldCheck} fullWidth>
              Reset Password
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-500 hover:text-burgundy transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              Back to Sign In
            </Link>
          </div>
        </>
      ) : (
        /* Success State */
        <div className="text-center animate-scale-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center border-2 border-green-100">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-champagne flex items-center justify-center animate-bounce">
                <Sparkles size={16} className="text-wine" />
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
            Password Updated!
          </h3>
          <p className="text-gray-500 text-sm mb-8">
            Your password has been reset successfully. You can now sign in with your new password.
          </p>

          <Button
            onClick={() => navigate('/login', { replace: true })}
            icon={LogIn}
            fullWidth
          >
            Continue to Sign In
          </Button>
        </div>
      )}
    </AuthLayout>
  );
}
