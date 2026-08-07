import { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import { Link as RouterLink } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import AuthField from '../components/ui/AuthField';
import useSeo from '../hooks/useSeo';
import { seo } from '../constants/seo';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  useSeo(seo.signup);

  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Enter your full name.';
    if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.';
    if (values.password.length < 8) next.password = 'Use at least 8 characters.';
    if (values.confirm !== values.password) next.confirm = 'Passwords do not match.';
    if (!accepted) next.terms = 'Accept the terms to continue.';
    setErrors(next);

    if (Object.keys(next).length === 0) {
      // Integration point: POST the registration payload to the account service.
      setNotice('Registration service is not connected yet.');
    }
  };

  return (
    <AuthLayout
      eyebrow="Create Account"
      title="Signup"
      subtitle="Open your ELIM FORGE account and enter the ecosystem."
      footer={
        <>
          Already have an account?{' '}
          <Box component={RouterLink} to="/login" sx={{ color: 'primary.light', fontWeight: 600 }}>
            Login
          </Box>
        </>
      }
    >
      <Stack component="form" spacing={3} onSubmit={handleSubmit} noValidate>
        {notice && (
          <Alert severity="info" variant="outlined" sx={{ borderRadius: 2 }} onClose={() => setNotice(null)}>
            {notice}
          </Alert>
        )}

        <AuthField
          id="signup-name"
          label="Full name"
          autoComplete="name"
          placeholder="Jordan Ellis"
          value={values.name}
          onChange={update('name')}
          error={errors.name}
          required
        />

        <AuthField
          id="signup-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={values.email}
          onChange={update('email')}
          error={errors.email}
          required
        />

        <AuthField
          id="signup-password"
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={values.password}
          onChange={update('password')}
          error={errors.password}
          required
        />

        <AuthField
          id="signup-confirm"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={values.confirm}
          onChange={update('confirm')}
          error={errors.confirm}
          required
        />

        <Box>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={accepted}
                onChange={(event) => {
                  setAccepted(event.target.checked);
                  setErrors((prev) => ({ ...prev, terms: undefined }));
                }}
              />
            }
            label="I accept the Terms of Service and Privacy Policy."
          />
          {errors.terms && (
            <Box sx={{ pl: 4, fontSize: '0.75rem', color: 'error.main' }}>{errors.terms}</Box>
          )}
        </Box>

        <Button type="submit" variant="contained" size="large" fullWidth>
          Signup
        </Button>
      </Stack>
    </AuthLayout>
  );
}
