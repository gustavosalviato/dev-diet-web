'use client'

import { TextInput } from '@/components/TextInput'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@/components/ErrorMessage'
import { ToastContainer } from 'react-toastify'
import { useAuthContext } from '@/context/authContext'
import { PageWrapper } from '@/components/PageWrapper'
import { motion } from 'framer-motion'

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must contain at least 6 character(s)',
  }),
})

type LoginFormData = z.infer<typeof LoginFormSchema>

export default function LoginPage() {
  const { signIn } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  })

  async function handleSignIn(data: LoginFormData) {
    const { email, password } = data

    await signIn({
      email,
      password,
    })
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
          <div className="flex items-center justify-center h-screen">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-28 items-center"
            >
              <div className="flex flex-col max-w-md w-full">
                <h1 className="text-3xl md:text-5xl font-bold mb-12">
                  Dev Diet
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-300">
                  Faça seu login na plataforma
                </h2>
              </div>
              <form
                onSubmit={handleSubmit(handleSignIn)}
                className="max-w-md rounded bg-zinc-800 w-full flex flex-col p-16"
              >
                <div className="space-y-4">
                  <TextInput
                    id="email"
                    placeholder="E-mail"
                    {...register('email')}
                  />

                  {errors.email && (
                    <ErrorMessage error={errors.email.message} />
                  )}

                  <TextInput
                    id="password"
                    placeholder="Password"
                    type="password"
                    {...register('password')}
                  />

                  {errors.password && (
                    <ErrorMessage error={errors.password.message} />
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
              </form>
            </motion.div>
          </div>
        </main>
      </PageWrapper>
    </>
  )
}
