// GoogleButton.tsx
import { ApolloError } from 'apollo-boost';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { useDetectedLanguage } from 'src/modules/auth/auth/adapters/in/hooks/useDetectedLanguage';
import { AuthFormMode } from 'src/modules/auth/auth/adapters/in/shared/enum';
import { goToPayment } from 'src/modules/auth/auth/adapters/in/shared/helpers';
import { openSnackbar } from 'src/shared/components/Snackbar/snackbar';
import { SnackbarProps } from 'src/shared/types/snackbar';

export default function SignUpOrSignInWithGoogle({ authFormMode }: { authFormMode: AuthFormMode }) {
  const { signUpWithGoogleHandler, signInWithGoogleHandler } = useContext(AuthContext);
  const { detectedLanguage } = useDetectedLanguage();

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    window.google?.accounts.id.initialize({
      client_id: process.env.OAUTH_GOOGLE_CLIENT_ID,
      callback: async (resp: any) => {
        if (authFormMode === AuthFormMode.SIGN_IN) {
          try {
            await signInWithGoogleHandler({
              idToken: resp.credential,
            });
          } catch (error) {
            openSnackbar({
              open: true,
              message: 'Ha habido un error al iniciar sesión con Google.',
              variant: 'alert',
              alert: {
                color: 'error',
              },
            } as SnackbarProps);
          }
        } else {
          try {
            const { data } = await signUpWithGoogleHandler({
              idToken: resp.credential,
              clientOffsetMinutes: new Date().getTimezoneOffset(),
              detectedLanguage,
            });
            if (data) goToPayment(data.signUpProfessionalWithGoogle.paymentLink);
          } catch (error) {
            openSnackbar({
              open: true,
              message: (error as ApolloError).message,
              variant: 'alert',
              alert: {
                color: 'error',
              },
            } as SnackbarProps);
          }
        }
      },
    });

    // @ts-ignore
    window.google?.accounts.id.renderButton(divRef.current, {
      theme: 'outline',
      type: 'standard',
      text: authFormMode === AuthFormMode.SIGN_IN ? 'signin_with' : 'signup_with',
      shape: 'pill',
      size: 'large',
      width: 199, // critical: prevents personalization
    });

    // @ts-ignore
    window.google?.accounts.id.disableAutoSelect();
  }, [signUpWithGoogleHandler]);

  return <div style={{ display: 'flex', justifyContent: 'center' }} ref={divRef} />;
}
