import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Giriş Başarılı!', tokenResponse);

      try {
        const response = await axios.post('http://localhost:3000/auth/google', {
          access_token: tokenResponse.access_token, // Erişim tokenini gönder
        });

        if (response.status === 200 || response.status === 201) {
          console.log('Arka Uç Girişi Başarılı:', response.data); // Arka ucun yanıtını logla
          navigate('/home');
        } else {
          console.error('Arka Uç Girişi Başarısız:', response.status, response.data); // Durumu ve veriyi logla
        }
      } catch (error) {
        console.error('Arka Uç Giriş Hatası:', error);
        if (error.response) {
          console.error('Arka Uç Hata Detayları:', error.response.data); // Arka uç hata detaylarını logla
        }
      }
    },
    onError: (error) => {
      console.error('Giriş Başarısız:', error);
    },
  });

  return (
    <div>
      <button onClick={() => login()}>Google ile Giriş Yap</button>
    </div>
  );
}

export default Login;
