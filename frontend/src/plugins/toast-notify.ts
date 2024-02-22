import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const error = (error: string) => {
  return toast({
    title: 'Oops! Algo deu errado.',
    description: error,
    duration: 1500,
    variant: 'destructive'
  })
}

const ok = (msg?: string) => {
  return toast({
    title: 'Operação realizada com sucesso!',
    description: msg,
    duration: 1500,
    class: 'text-white bg-green-400'
  })
}

export const useNotify = () => ({ ok, error })
