import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    skillLevel: '',
    programmingLanguages: [],
    careerGoal: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const skillLevelOptions = [
    { value: 'beginner', label: 'Beginner', description: 'Just starting my coding journey' },
    { value: 'intermediate', label: 'Intermediate', description: 'Comfortable with basic concepts' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced developer' }
  ];

  const programmingLanguages = [
    { id: 'javascript', label: 'JavaScript', icon: 'FileCode' },
    { id: 'python', label: 'Python', icon: 'FileCode' },
    { id: 'java', label: 'Java', icon: 'FileCode' },
    { id: 'cpp', label: 'C++', icon: 'FileCode' },
    { id: 'csharp', label: 'C#', icon: 'FileCode' },
    { id: 'go', label: 'Go', icon: 'FileCode' }
  ];

  const careerGoals = [
    { value: 'interview-prep', label: 'Interview Preparation', description: 'Preparing for technical interviews' },
    { value: 'skill-building', label: 'Skill Building', description: 'Improving coding abilities' },
    { value: 'career-change', label: 'Career Change', description: 'Transitioning to software development' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (password?.length >= 12) strength += 25;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) strength += 25;
    if (/\d/?.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/?.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      let strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLanguageToggle = (langId) => {
    setFormData(prev => ({
      ...prev,
      programmingLanguages: prev?.programmingLanguages?.includes(langId)
        ? prev?.programmingLanguages?.filter(id => id !== langId)
        : [...prev?.programmingLanguages, langId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 50) {
      newErrors.password = 'Password is too weak. Add uppercase, numbers, and special characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.skillLevel) {
      newErrors.skillLevel = 'Please select your skill level';
    }

    if (formData?.programmingLanguages?.length === 0) {
      newErrors.programmingLanguages = 'Select at least one programming language';
    }

    if (!formData?.careerGoal) {
      newErrors.careerGoal = 'Please select your career goal';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Registration data:', formData);
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 2000);
  };

  const getPasswordStrengthVariant = () => {
    if (passwordStrength < 40) return 'error';
    if (passwordStrength < 70) return 'warning';
    return 'success';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 70) return 'Medium';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          
          {formData?.password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password Strength:</span>
                <span className={`font-medium ${
                  passwordStrength < 40 ? 'text-error' : 
                  passwordStrength < 70 ? 'text-warning': 'text-success'
                }`}>
                  {getPasswordStrengthLabel()}
                </span>
              </div>
              <ProgressIndicator
                value={passwordStrength}
                max={100}
                showLabel={false}
                variant={getPasswordStrengthVariant()}
                size="sm"
              />
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        <Select
          label="Skill Level"
          placeholder="Select your current skill level"
          options={skillLevelOptions}
          value={formData?.skillLevel}
          onChange={(value) => handleInputChange('skillLevel', value)}
          error={errors?.skillLevel}
          required
        />
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Programming Languages <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {programmingLanguages?.map((lang) => (
              <button
                key={lang?.id}
                type="button"
                onClick={() => handleLanguageToggle(lang?.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  formData?.programmingLanguages?.includes(lang?.id)
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-foreground hover:border-primary/50'
                }`}
              >
                <Icon name={lang?.icon} size={18} />
                <span className="text-sm font-medium">{lang?.label}</span>
                {formData?.programmingLanguages?.includes(lang?.id) && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
          {errors?.programmingLanguages && (
            <p className="mt-2 text-sm text-error">{errors?.programmingLanguages}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Career Goal <span className="text-error">*</span>
          </label>
          <div className="space-y-2">
            {careerGoals?.map((goal) => (
              <button
                key={goal?.value}
                type="button"
                onClick={() => handleInputChange('careerGoal', goal?.value)}
                className={`w-full flex items-start space-x-3 px-4 py-3 rounded-lg border-2 transition-all text-left ${
                  formData?.careerGoal === goal?.value
                    ? 'border-primary bg-primary/10' :'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData?.careerGoal === goal?.value
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {formData?.careerGoal === goal?.value && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{goal?.label}</div>
                  <div className="text-sm text-muted-foreground">{goal?.description}</div>
                </div>
              </button>
            ))}
          </div>
          {errors?.careerGoal && (
            <p className="mt-2 text-sm text-error">{errors?.careerGoal}</p>
          )}
        </div>
      </div>
      <div className="space-y-3 pt-2">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />
        <Checkbox
          label="I agree to the Privacy Policy"
          checked={formData?.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
          error={errors?.agreeToPrivacy}
          required
        />
      </div>
      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          iconName="UserPlus"
          iconPosition="left"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Already have an account? Sign In Instead
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;