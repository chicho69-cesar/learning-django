import { useEffect, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { register } from '../../actions/user'
import Loader from '../../components/Loader'
import Messages from '../../components/Messages'

export default function Register() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const userRegister = useSelector((state) => state.userRegister)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { userInfo, loading, error } = userRegister
  const path = '/'

  useEffect(() => {
    if (userInfo) {
      navigate(path)
    }
  }, [userInfo, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(userName, email, password))
    }
  }

  return (
    <>
      {message && <Messages>{message}</Messages>}
      {error && <Messages>{error}</Messages>}

      {loading ? (
        <Loader />
      ) : (
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
          <div className='w-full max-w-md space-y-8'>
            <div>
              <img
                className='mx-auto h-12 w-auto'
                src='/media/user.png'
                alt='Your Company'
              />

              <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                Sign up to your account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
              <input type='hidden' name='remember' defaultValue='true' />

              <div className='-space-y-px rounded-md shadow-sm'>
                <div className='my-8'>
                  <div className='my-8'>
                    <label htmlFor='email-address' className='sr-only'>
                      Username
                    </label>

                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      id='username'
                      name='username'
                      type='text'
                      autoComplete='email'
                      required
                      className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      placeholder='Username'
                    />
                  </div>

                  <div className=''>
                    <label htmlFor='email-address' className='sr-only'>
                      Email address
                    </label>

                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id='email-address'
                      name='email'
                      type='email'
                      autoComplete='email'
                      required
                      className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      placeholder='Email address'
                    />
                  </div>

                  <div className='my-8'>
                    <label htmlFor='password' className='sr-only'>
                      Password
                    </label>

                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      placeholder='Password'
                    />
                  </div>

                  <div className='my-8'>
                    <label htmlFor='confirm-password' className='sr-only'>
                      Confirm Password
                    </label>

                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      id='confirm-password'
                      name='confirm-password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      placeholder='Confirm Password'
                    />
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='text-sm'>
                  <a href='/login' className='font-medium text-indigo-600 hover:text-indigo-500'>
                    Sig in
                  </a>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                    <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
                  </span>

                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
