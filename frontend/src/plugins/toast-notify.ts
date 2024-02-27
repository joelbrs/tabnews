import { useToast } from '@/components/ui/toast/use-toast'
import type { AxiosError } from 'axios'

const { toast } = useToast()

const error = ({ response }: AxiosError) => {
  return toast({
    title: 'Oops! Algo deu errado.',
    description: (response?.data as any).message,
    duration: 1500,
    class: 'h-10',
    variant: 'destructive'
  })
}

const ok = (msg?: string) => {
  return toast({
    title: 'Operação realizada com sucesso!',
    description: msg,
    duration: 1500,
    class: 'text-white bg-green-400 h-10'
  })
}

export const useNotify = () => ({ ok, error })
