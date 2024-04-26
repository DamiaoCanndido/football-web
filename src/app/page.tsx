'use client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContextGlobal } from '@/contexts/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RxEyeOpen, RxEyeNone } from 'react-icons/rx';
import { setCookie } from 'cookies-next';

const formSchema = z.object({
  key: z
    .string()
    .trim()
    .min(3, { message: 'A chave deve conter no mínimo 3 caracteres.' })
    .max(50, { message: 'A chave não pode exceder 50 caracteres.' }),
});

export default function Page() {
  const { setToken } = AuthContextGlobal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: '',
    },
  });

  async function onSubmit({ key }: z.infer<typeof formSchema>) {
    setCookie('token', key);
    setToken(key);
    router.replace('/team');
  }

  const router = useRouter();
  const [typePW, setTypePW] = useState('password');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    if (!showPassword) {
      setTypePW('text');
    } else {
      setTypePW('password');
    }
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chave</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Insira a chave"
                        type={typePW}
                        {...field}
                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-dark sm:text-sm sm:leading-6"
                      />
                      <button
                        onClick={toggleShowPassword}
                        type="button"
                        className="absolute top-1/2 right-3 -translate-y-1/2"
                      >
                        {showPassword ? <RxEyeOpen /> : <RxEyeNone />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="flex w-full justify-center rounded-md bg-violet-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
