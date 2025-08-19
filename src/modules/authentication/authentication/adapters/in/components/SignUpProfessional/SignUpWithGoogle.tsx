// GoogleButton.tsx
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { useDetectedLanguage } from 'src/modules/authentication/authentication/adapters/in/hooks/useDetectedLanguage';

export default function SignUpWithGoogle() {
  const { signUpWithGoogleHandler } = useContext(AuthContext);
  const { detectedLanguage } = useDetectedLanguage();

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    window.google?.accounts.id.initialize({
      client_id: process.env.OAUTH_GOOGLE_CLIENT_ID,
      callback: async (resp: any) => {
        await signUpWithGoogleHandler({
          idToken: resp.credential,
          clientOffsetMinutes: new Date().getTimezoneOffset(),
          detectedLanguage,
        });
      },
    });
    // @ts-ignore
    window.google?.accounts.id.renderButton(divRef.current, {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      text: 'signup_with',
      shape: 'pill',
    });
  }, [signUpWithGoogleHandler]);

  return <div ref={divRef} />;
}
