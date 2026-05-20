'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useStore } from '@/lib/store'
import { X } from 'lucide-react'

export function AuthModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(36),
        email,
        name: name || email.split('@')[0],
        role: 'buyer' as const
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      onOpenChange(false)
      
      // Reset form
      setEmail('')
      setPassword('')
      setName('')
      setIsLoading(false)
    }, 600)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{isLogin ? 'Вход в аккаунт' : 'Создать аккаунт'}</DialogTitle>
          <DialogDescription>
            {isLogin ? 'Войдите в свой аккаунт' : 'Зарегистрируйтесь, чтобы покупать и продавать'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input 
                id="name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Иван Иванов"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@example.com"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>

          <Button type="submit" className="w-full h-12" disabled={isLoading}>
            {isLoading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </Button>
        </form>

        <div className="text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
