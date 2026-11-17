import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Mail, ArrowLeft, Send, CheckCircle, Sparkles, KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '' } });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await forgotPassword(data.email);
      setVerifiedEmail(data.email);
      setEmailSent(true);
      toast.success('Reset link has been sent to your email!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToReset = () => {
    navigate(`/reset-password?email=${encodeURIComponent(verifiedEmail)}`);
  };

  return (
    <AuthLayout
      title={emailSent ? '' : 'Forgot Password'}
      subtitle={emailSent ? '' : "No worries! Enter your registered email and we'll help you reset it."}
    >
      {!emailSent ? (
        /* Step 1: Enter Email */
        <>
          {/* Illustration */}
          <div className="flex justify-center mb-6 animate-scale-in">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-champagne-50 to-champagne-100 flex items-center justify-center border border-champagne/20">
              <KeyRound size={36} className="text-champagne-600" />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Registered Email"
              icon={Mail}
              type="email"
              placeholder="Enter your registered email"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />

            <Button type="submit" loading={loading} icon={Send} fullWidth>
              Send Reset Link
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
        /* Step 2: Email Sent Confirmation */
        <div className="text-center animate-scale-in">
          {/* Success illustration */}
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
            Check Your Email
          </h3>
          <p className="text-gray-500 text-sm mb-2">
            We've sent a password reset link to
          </p>
          <p className="text-burgundy font-semibold text-sm mb-6 px-4 py-2 rounded-xl bg-burgundy/5 inline-block">
            {verifiedEmail}
          </p>
          <p className="text-gray-400 text-xs mb-8">
            Didn't receive the email? Check your spam folder or try again.
          </p>

          {/* Continue to reset */}
          <Button
            onClick={handleContinueToReset}
            icon={ArrowLeft}
            iconPosition="left"
            fullWidth
            className="mb-4"
          >
            Continue to Reset Password
          </Button>

          <button
            onClick={() => setEmailSent(false)}
            className="text-sm font-medium text-gray-500 hover:text-burgundy transition-colors"
          >
            Try another email
          </button>
        </div>
      )}
    </AuthLayout>
  );
}
