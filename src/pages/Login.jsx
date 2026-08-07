import { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@/components/ui/layout';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import AuthField from '../components/ui/AuthField';
import useSeo from '../hooks/useSeo';
import { seo } from '../constants/seo';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  useSeo(seo.login);

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.';
    if (values.password.length < 8) next.password = 'Password must be at least 8 characters.';
    setErrors(next);

    if (Object.keys(next).length === 0) {
      // Integration point: POST these credentials to the authentication service.
      setNotice('Authentication service is not connected yet.');
    }
  };

  return (
    <AuthLayout
      eyebrow="Account Access"
      title="Login"
      subtitle="Sign in to your ELIM FORGE account."
      footer={
        <>
          Don’t have an account?{' '}
          <Box component={RouterLink} to="/signup" sx={{ color: 'primary.light', fontWeight: 600 }}>
            Signup
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
          id="login-email"
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
          id="login-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          onChange={update('password')}
          error={errors.password}
          required
        />

        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" useFlexGap>
          <FormControlLabel control={<Checkbox size="small" />} label="Remember me" />
          <Typography
            component="a"
            href="#"
            variant="body2"
            sx={{ color: 'primary.light', '&:hover': { textDecoration: 'underline' } }}
          >
            Forgot password?
          </Typography>
        </Stack>

        <Button type="submit" variant="contained" size="large" fullWidth>
          Login
        </Button>
      </Stack>
    </AuthLayout>
  );
}
