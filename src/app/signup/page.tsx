'use client'

import { TextInput } from '@/components/TextInput'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@/components/ErrorMessage'
import { api } from '@/services/axios'
import { AxiosError } from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { PageWrapper } from '@/components/PageWrapper'
import { motion } from 'framer-motion'

const SignUpFormSchema = z
  .object({
    email: z.string().email(),
    name: z.string({
      required_error: 'Name is required',
    }),
    password: z.string().min(6, {
      message: 'Password must contain at least 6 character(s)',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords dot not match',
    path: ['confirmPassword'],
  })

type LoginFormData = z.infer<typeof SignUpFormSchema>

export default function LoginPage() {
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(SignUpFormSchema),
  })

  async function handleSingUp(data: LoginFormData) {
    const { email, password, name } = data
    try {
      await api.post('/register', {
        name,
        password,
        email,
      })

      push('/login')
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.response?.data.message, {
          type: 'error',
        })
      }
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable
        theme="dark"
      />

      <PageWrapper>
        <main className="max-w-7xl p-4 w-full mx-auto">
          <div className="flex justify-center items-center h-screen w-full gap-28">
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit(handleSingUp)}
              className="max-w-md rounded bg-zinc-800 w-full flex flex-col p-16"
            >
              <div className="space-y-4">
                <TextInput
                  id="email"
                  placeholder="E-mail"
                  {...register('email')}
                />

                {errors.email && <ErrorMessage error={errors.email.message} />}

                <TextInput id="name" placeholder="Name" {...register('name')} />

                {errors.name && <ErrorMessage error={errors.name.message} />}

                <TextInput
                  id="password"
                  placeholder="Password"
                  type="password"
                  {...register('password')}
                />

                {errors.password && (
                  <ErrorMessage error={errors.password.message} />
                )}

                <TextInput
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  {...register('confirmPassword')}
                />

                {errors.confirmPassword && (
                  <ErrorMessage error={errors.confirmPassword.message} />
                )}
              </div>

              <button
                type="submit"
                className="rounded-md font-semibold min-w-120 px-4 flex items-center justify-center gap-2 text-zinc-50 cursor-pointer transition-all duration-300 disabled:cursor-not-allowed mt-6 bg-indigo-500 h-12 ease-in-out hover:bg-indigo-500/60 disabled:hover:bg-indigo-500/60"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="animate-spin" />}
                {!isSubmitting && 'Continue'}
              </button>

              <p className="text-sm text-zinc-400 text-center mt-6">
                Do not have an account?{' '}
                <Link
                  href="/signup"
                  className="text-indigo-500 font-semibold duration-300 transition-colors hover:text-indigo-500/60"
                >
                  Register
                </Link>
              </p>
            </motion.form>
          </div>
        </main>
      </PageWrapper>
    </>
  )
}
