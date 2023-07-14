'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { userAgentFromString } from 'next/server';


const RegisterModal = () => {
  
  const RegisterModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
        errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
        name: '',
        email: '',
        password: ''
    }
  })
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
  }

  return (
    <div>
      
    </div>
  )
}

export default RegisterModal

// NB FieldValues is a custom generic of forms hook