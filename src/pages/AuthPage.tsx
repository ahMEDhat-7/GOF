import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuthStore } from '../stores/useAuthStore';
import api from '../services/api';

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'الاسم مطلوب'),
  companyKey: z.string().min(4, 'رمز الشركة مطلوب'),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const setUser = useAuthStore((s) => s.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginForm | RegisterForm>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        // طلب تسجيل الدخول
        const res = await api.post('/auth/login', data);
        setUser(res.data.user, res.data.token);
        toast.success('تم تسجيل الدخول بنجاح');
      } else {
        // طلب التسجيل
        const res = await api.post('/auth/register', data);
        setUser(res.data.user, res.data.token);
        toast.success('تم إنشاء الحساب بنجاح');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'حدث خطأ، حاول مرة أخرى');
    }
  };

  const nameError = (errors as any).name;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-2">
          {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm font-medium">الاسم</label>
              <input
                type="text"
                {...register('name')}
                className="input input-bordered w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="اسمك الكامل"
                aria-invalid={!!nameError}
                aria-label="الاسم"
              />
              {nameError && <span className="text-red-500 text-xs">{nameError.message as string}</span>}
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium">البريد الإلكتروني</label>
            <input
              type="email"
              {...register('email')}
              className="input input-bordered w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="example@email.com"
              aria-invalid={!!errors.email}
              aria-label="البريد الإلكتروني"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">كلمة المرور</label>
            <input
              type="password"
              {...register('password')}
              className="input input-bordered w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              aria-label="كلمة المرور"
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message as string}</span>}
          </div>
          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm font-medium">رمز الشركة</label>
              <input
                type="text"
                {...register('companyKey')}
                className="input input-bordered w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="رمز الشركة"
                aria-invalid={!!(errors as any).companyKey}
                aria-label="رمز الشركة"
              />
              {(errors as any).companyKey && (
                <span className="text-red-500 text-xs">
                  {(errors as any).companyKey.message as string}
                </span>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </button>
        </form>
        <div className="text-center">
          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={() => {
              setIsLogin((v) => !v);
              reset();
            }}
          >
            {isLogin ? 'ليس لديك حساب؟ أنشئ حساب جديد' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 